export const demoUserBlockMiddleware = (req, res, next) => {
  if (req.user.isDemo) {
    return res.status(403).json({
      message: "You're using a demo account. This feature is disabled.",
    });
  }
  next();
};
