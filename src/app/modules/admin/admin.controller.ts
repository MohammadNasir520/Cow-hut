import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminService } from "./admin.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

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


export const AdminController = {
  createAdmin,

};
