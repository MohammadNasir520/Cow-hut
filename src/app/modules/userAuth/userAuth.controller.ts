import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserAuthService } from "./userAuth.service";

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

export const userAuthController = {
  signUp,
};
