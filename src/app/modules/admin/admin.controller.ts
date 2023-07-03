import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminService } from "./admin.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import config from "../../../config";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const adminData = req.body;
  console.log(adminData);
  const result = await AdminService.createAdmin(adminData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admins created successfully",
    data: result,
  });
});

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const adminLoginData = req.body;
  const result = await AdminService.loginAdmin(adminLoginData);

  const { accessToken, refreshToken } = result;

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admin logged in successfully",
    data: { accessToken },
  });
});

export const AdminController = {
  createAdmin,
  loginAdmin,
};
