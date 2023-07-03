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
// const getSingleAdmin = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     const getAllAdmins = await AdminService.getSingleAdmin(id);

//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: "Admin retrieved successfully",
//       data: getAllAdmins,
//     });
//   }
// );

// const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
//   const id = req.params.id;
//   const updatedDAta = req.body;
//   const updatedAdmin = await AdminService.updateAdmin(id, updatedDAta);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Admin updated successfully",
//     data: updatedAdmin,
//   });
// };

// const deleteSingleAdmin = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const deleteSingleAdmin = await AdminService.deleteSingleAdmin(id);

//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "Admin deleted successfully",
//     data: deleteSingleAdmin,
//   });
// };

export const AdminController = {
  createAdmin,
  // getSingleAdmin,
  // deleteSingleAdmin,
  // updateAdmin,
};
