import express from "express";
import { registerUserFieldValidator } from "../validations/user.validation.js";
import {
  deleteUserAccountController,
  getUserDetailsController,
  updateEmailController,
  updatePhoneNumberController,
  updateUserAvatarController,
  updateUserPasswordController,
  userLastLoginController,
  userLoginController,
  userLogoutController,
  userRegistrationController,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

// ---- Router :-  user registration -----
router.post(
  "/register",
  registerUserFieldValidator,
  userRegistrationController,
);

// Routes : User Login
router.post("/login", userLoginController);

// Routes : User Logout
router.post("/logout", verifyUser, userLogoutController);

// ---- Router :-  user get details -----
router.get("/user/details", verifyUser, getUserDetailsController);

// ---- Router :-  update email -----
router.patch("/update/email", verifyUser, updateEmailController);

// ---- Router :-  update email -----
router.patch("/update/phoneNumber", verifyUser, updatePhoneNumberController);

// ---- Router :-  update user password -----
router.patch("/update/password", verifyUser, updateUserPasswordController);

// ---- Router :-  delete user account -----
router.delete("/delete/account", verifyUser, deleteUserAccountController);

// ---- Router :-  update user avatar -----
router.put(
  "/update/avatar",
  verifyUser,
  upload.single("avatar"),
  updateUserAvatarController,
);

// ---- Router :-  user last login checker -----
router.get("/last/login", userLastLoginController);

export default router;
