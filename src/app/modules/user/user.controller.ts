import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import ApiError from "../../../errors/ApiError";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const getAllUsers = await UserService.getAllUsers();

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "users retrieved successfully",
    data: getAllUsers,
  });
};
const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const getAllUsers = await UserService.getSingleUser(id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "user retrieved successfully",
      data: getAllUsers,
    });
  }
);

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const updatedDAta = req.body;
  const updatedUser = await UserService.updateUser(id, updatedDAta);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "user deleted successfully",
    data: updatedUser,
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
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateUser,
};
