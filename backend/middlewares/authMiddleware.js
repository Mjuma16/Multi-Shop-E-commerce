import "dotenv/config";
import jwt from "jsonwebtoken";
export const isAuthenticateUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(new Error("Please login to access this resource"));
    }
    const { payload } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};

export const authrizedUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Error(
          `Role ${req.user.role} is not allowed to access this resources`
        )
      );
    }
    next();
  };
};
