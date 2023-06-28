import { NextFunction, Request, RequestHandler, Response } from "express";
import { CowService } from "./cow.service";
import catchAsync from "../../../shared/catchAsync";
import ApiError from "../../../errors/ApiError";

const createCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const CowData = req.body;

    const createCow = await CowService.createCow(CowData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cow created successfully",
      data: createCow,
    });
  }
);

const getAllCows = async (req: Request, res: Response, next: NextFunction) => {
  const paginationOptions = req.query;
  const getAllCows = await CowService.getAllCows(paginationOptions);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Cows retrieved successfully",
    data: getAllCows,
  });
};
const getSingleCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const getAllCows = await CowService.getSingleCow(id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cow retrieved successfully",
      data: getAllCows,
    });
  }
);
const deleteSingleCow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const deleteSingleCow = await CowService.deleteSingleCow(id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Cow deleted successfully",
    data: deleteSingleCow,
  });
};

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  deleteSingleCow,
};
