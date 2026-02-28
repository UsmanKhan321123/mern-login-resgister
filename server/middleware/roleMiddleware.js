const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // protect middleware must run before this
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role (${req.user.role}) is not allowed to access this resource`,
      });
    }

    next();
  };
};

export default authorizeRoles;