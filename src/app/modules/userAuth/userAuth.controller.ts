import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserAuthService } from "./userAuth.service";
import config from "../../../config";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;

    const createUser = await UserAuthService.createUser(userData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "user created successfully",
      data: createUser,
    });
  }
);

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const UserLoginData = req.body;
  const result = await UserAuthService.loginUser(UserLoginData);

  const { accessToken, refreshToken } = result;

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: { accessToken },
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await UserAuthService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: result,
  });
});

export const userAuthController = {
  signUp,
  loginUser,
  refreshToken,
};
