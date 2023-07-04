import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const getAllUsers = await UserService.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "users retrieved successfully",
    data: getAllUsers,
  });
};
const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const getAllUsers = await UserService.getSingleUser(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "user retrieved successfully",
      data: getAllUsers,
    });
  }
);

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const updatedDAta = req.body;
  const updatedUser = await UserService.updateUser(id, updatedDAta);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "user updated successfully",
    data: updatedUser,
  });
};

const deleteSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteSingleUser = await UserService.deleteSingleUser(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "user deleted successfully",
    data: deleteSingleUser,
  });
};
const getMyProfile = async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await UserService.getProfile(user);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "your profile successfully",
    data: result,
  });
};
const updateMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = (req.user as JwtPayload)._id;
  const updatedDAta = req.body;
  const result = await UserService.updateMyProfile(id, updatedDAta);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "user updated successfully",
    data: result,
  });
};
export const UserController = {
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateUser,
  getMyProfile,
  updateMyProfile,
};
