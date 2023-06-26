import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const userData = req.body;

  const createUser = await UserService.createUser(userData);

  res.status(200).json({
    success: true,
    message: "user created successfully",
    data: createUser,
  });
};
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const getAllUsers = await UserService.getAllUsers();

  res.status(200).json({
    success: true,
    message: "user created successfully",
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
    message: "user created successfully",
    data: getAllUsers,
  });
};

export const UserController = {
  signUp,
  getAllUsers,
  getSingleUser,
};
