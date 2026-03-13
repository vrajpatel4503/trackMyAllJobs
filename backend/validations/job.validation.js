export const jobFieldValidator = (req, res, next) => {
  const {
    companyName,
    positionApplied,
    companyCity,
    applyMethod,
    hrEmail,
    jobLink,
    workMode,
    status,
  } = req.body;

  if (!companyName?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Company name is required",
    });
  }

  if (!positionApplied?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Position applied is required",
    });
  }

  if (!companyCity?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Company city is required",
    });
  }

  if (!applyMethod) {
    return res.status(400).json({
      success: false,
      message: "Apply method is required",
    });
  }

  if (applyMethod === "email") {
    if (!hrEmail?.trim()) {
      return res.status(400).json({
        success: false,
        message: "HR email is required when apply by email",
      });
    }
  }

  if (applyMethod && applyMethod !== "email") {
    if (!jobLink?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job link is required",
      });
    }

    try {
      new URL(jobLink);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid job link URL",
      });
    }
  }

  if (hrEmail) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(hrEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid HR email format",
      });
    }
  }

  if (!workMode) {
    return res.status(400).json({
      success: false,
      message: "Work mode is required",
    });
  }

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Status is required",
    });
  }
  next();
};
