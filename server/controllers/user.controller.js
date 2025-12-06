import { User } from "../models/user.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import { sendToken } from "../utilities/sendToken.utility.js";
import bcrypt from "bcryptjs";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { fullName, username, password, gender } = req.body;

  if (!fullName || !username || !password || !gender) {
    return next(new errorHandler("All fields are required!", 400));
  }

  const user = await User.findOne({ username });
  if (user) {
    return next(new errorHandler("User already exists", 400));
  }

  const genderType = gender === "male" ? "boy" : "girl";
  const avatar = `https://avatar.iran.liara.run/public/${genderType}?username=${username}`;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    fullName,
    username,
    password: hashedPassword,
    gender,
    avatar,
  });

  return sendToken(res, newUser, "User Registered Successfully", 201);
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new errorHandler("All fields are required!", 400));
  }

  const user = await User.findOne({ username });
  if (!user) {
    return next(
      new errorHandler("Please enter a valid username or password!", 404)
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(
      new errorHandler("Please enter a valid username or password!", 404)
    );
  }

  return sendToken(res, user, "User Logged In Successfully");
});

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const profile = await User.findById(userId);
  if (!profile) {
    return next(new errorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    responseData: profile,
  });
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged Out Succesfully!",
    });
});

export const otherUsers = asyncHandler(async (req, res, next) => {
  const otherUsers = await User.find({ _id: { $ne: req.user.id } });
  res.status(200).json({
    success: true,
    responseData: otherUsers,
  });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;

  const user = await User.findById(userId);
  if (!user) {
    return next(new errorHandler("User not found!", 404));
  }

  await User.findByIdAndDelete(userId);

  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Account Deleted Successfully",
    });
});

export const updateAvatar = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;
  const { avatar } = req.body; 

  if (!avatar) {
    return next(new errorHandler("No avatar provided", 400));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  user.avatar = avatar;
  await user.save();

  res.status(200).json({
    success: true,
    responseData: user,
    message: "Avatar updated successfully",
  });
});
