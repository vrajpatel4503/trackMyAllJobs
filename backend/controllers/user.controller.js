import userModel from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import cloudinary from "../config/cloudinary.config.js";
import { uploadOnCloudinary } from "../utils/cloudinaryUpload.js";

const generateRefreshTokenAndAccessToken = async (userId) => {
  try {
    const user = await userModel.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Token generation failed");
  }
};

// ------ Controller :- User Registration ------
export const userRegistrationController = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body;

    // check if email or phone number already exist
    const existingUser = await userModel
      .findOne({
        $or: [{ email }, { phoneNumber }],
      })
      .lean();

    if (existingUser) {
      let message = "";

      if (existingUser.email === email) {
        message = "Email is already exists";
      } else if (existingUser.phoneNumber === phoneNumber) {
        message = "Phone Number is already exists";
      }

      return res.status(409).json({
        success: false,
        message,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    // create user
    const user = new userModel({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      joinedAt: new Date(),
      lastLogin: null,
      isOnline: null,
    });

    await user.save();

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      createdUser: userObj,
    });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while register user. Please try again later.",
    });
  }
};

// ------ Controller :- User Login ------
export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // check for user with only required field
    const user = await userModel
      .findOne({ email })
      .select(
        "_id fullName email password phoneNumber role avatar joinedAt lastLogin isOnline createdAt updatedAt",
      )
      .lean();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // compare password
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // generate tokens
    const { accessToken, refreshToken } =
      await generateRefreshTokenAndAccessToken(user._id);

    if (!accessToken || !refreshToken) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate tokens",
      });
    }

    // update login status
    await userModel.findByIdAndUpdate(
      user._id,
      {
        $set: {
          lastLogin: new Date(),
          isOnline: true,
        },
      },
      { new: true },
    );

    // remove password before sending
    delete user.password;

    const isProduction = process.env.NODE_ENV === "production";

    const options = {
      httpOnly: true,
      secure: isProduction, // true only on production (Vercel)
      sameSite: isProduction ? "none" : "lax", // none for cross-origin in production, lax locally
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    return res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .status(200)
      .json({
        success: true,
        message: `Welcome back ${user.fullName}`,
        user,
        accessToken,
        refreshToken,
      });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while login. Please try again later.",
    });
  }
};

// ------ Controller :- User Login ------
export const userLogoutController = async (req, res) => {
  try {
    await userModel
      .findByIdAndUpdate(
        req.user._id,
        {
          $unset: { refreshToken: "" },
        },
        { new: true },
      )
      .lean();

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    return res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "User logged out successfully",
      });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to logout. Please try again",
    });
  }
};

// ------ Controller :- User Details ------
export const getUserDetailsController = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await userModel
      .findById(id)
      .select("-password -refreshToken")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong on the server. Please try again later.",
    });
  }
};

// ------ Controller :- Update User Email ------
export const updateEmailController = async (req, res) => {
  try {
    const { id } = req.user;
    const { email } = req.body;

    // check is email provided by user
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email",
      });
    }

    //  Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format. It must contain '@' and a domain",
      });
    }

    // Find the current user
    const existingUser = await userModel.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If email is different from current email, check for duplication
    if (email !== existingUser.email) {
      const emailExist = await userModel.findOne({ email });
      if (emailExist) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "New email is same as the current email",
      });
    }

    // update the email
    existingUser.email = email;
    await existingUser.save();

    return res.status(200).json({
      success: true,
      message: "Email updated successfully",
      user: {
        email: existingUser.email,
      },
    });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while updating email. Please try again later.",
    });
  }
};

// ------ Controller :- Update User phoneNumber ------
export const updatePhoneNumberController = async (req, res) => {
  try {
    const { id } = req.user;
    const { phoneNumber } = req.body;

    // check if phone Number is provided
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Please provide a phone number",
      });
    }

    // Validate phone number format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number. It must be exactly 10 digits.",
      });
    }

    // check if user exist
    const existingUser = await userModel.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If email is different from current email, check for duplication
    if (phoneNumber !== existingUser.phoneNumber) {
      const existPhoneNumber = await userModel.findOne({ phoneNumber });
      if (existPhoneNumber) {
        return res.status(409).json({
          success: false,
          message: "Phone number already exists",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "The new phone number is the same as the current one",
      });
    }

    // update the phone Number
    existingUser.phoneNumber = phoneNumber;
    await existingUser.save();

    return res.status(200).json({
      success: true,
      message: "Phone number updated successfully",
    });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while updating phone number. Please try again later.",
    });
  }
};

// ------ Controller :- update user password ------
export const updateUserPasswordController = async (req, res) => {
  try {
    const { id } = req.user;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please provide a password",
      });
    }

    const user = await userModel.findById(id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isSamePassword = await bcryptjs.compare(password, user.password);

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from old password",
      });
    }

    // hash new password
    const hashedPassword = await bcryptjs.hash(password, 8);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while updating password. Please try again later.",
    });
  }
};

// ------ Controller :- delete user account ------
export const updateUserAvatarController = async (req, res) => {
  try {
    const { id } = req.user;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Avatar is required. Please upload an image.",
      });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Only JPG, PNG, WEBP images are allowed",
      });
    }

    if (req.file.size > 200 * 1024) {
      return res.status(400).json({
        success: false,
        message: "File size must be under 200KB",
      });
    }

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const avatarBuffer = req.file.buffer;
    const avatarUpload = await uploadOnCloudinary(avatarBuffer, "avatars");

    if (!avatarUpload?.secure_url || !avatarUpload?.public_id) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload avatar. Please try again.",
      });
    }

    // delete old avatar
    if (user.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    // update avatar in DB
    user.avatar = {
      public_id: avatarUpload.public_id,
      url: avatarUpload.secure_url,
    };

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Avatar updated successfully.",
      avatar: user,
    });

    // try part end
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating avatar.",
    });
  }
};

// ------ Controller :- delete user account ------
export const deleteUserAccountController = async (req, res) => {
  try {
    const { id } = req.user;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const user = await userModel.findById(id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Delete avatar if not default
    if (
      user.avatar?.public_id &&
      user.avatar.public_id !== process.env.DEFAULT_AVATAR_PUBLIC_ID
    ) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    await userModel.findByIdAndDelete(id);

    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting account. Please try later.",
    });
  }
};

// ------ Controller :- user last login ------
export const userLastLoginController = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email }).select("lastLogin").lean();

    return res.status(200).json({
      lastLogin: user?.lastLogin || null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching last login",
    });
  }
};
