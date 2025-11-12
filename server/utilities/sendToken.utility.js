import jwt from "jsonwebtoken";

export const sendToken = (res, user, message, statusCode = 200) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  return res
    .status(statusCode)
    .cookie("token", token, {
      expiresIn: new Date(
        Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    })
    .json({
      success: true,
      userData: { user, token },
      message,
    });
};
