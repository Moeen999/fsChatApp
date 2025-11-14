import { errorHandler } from "../utilities/errorHandler.utility.js";
import jwt from "jsonwebtoken"
export const isAuthenticated = (req, res, next) => {
  const token =
    req.cookies.token || req.header["Authorization"]?.replace("Bearer ", ""); 
    //? bearer token is mobile specific while the cookies are browser specific
  if (!token) {
    return next(new errorHandler("Invalid Token!", 400));
  }
  const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = tokenData;
  next();
};
