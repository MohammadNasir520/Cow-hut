import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";

const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;

    const createUser = await UserService.createUser(userData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "user created successfully",
      data: createUser,
    });
  }
);

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const getAllUsers = await UserService.getAllUsers();

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "users retrieved successfully",
    data: getAllUsers,
  });
};
const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const getAllUsers = await UserService.getSingleUser(id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "user retrieved successfully",
    data: getAllUsers,
  });
};
const deleteSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const deleteSingleUser = await UserService.deleteSingleUser(id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "user deleted successfully",
    data: deleteSingleUser,
  });
};

export const UserController = {
  signUp,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
};
