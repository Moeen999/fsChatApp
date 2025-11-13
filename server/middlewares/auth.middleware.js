import { errorHandler } from "../utilities/errorHandler.utility.js";

export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token || req.header["Authorization"]?.replace("Bearer ", "");
    console.log("Token:", token);
    if (!token) {
        return next(new errorHandler("Invalid Token!", 400));
    }
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    console.log("tokenData",tokenData);
    next();
}