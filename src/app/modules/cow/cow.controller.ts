import { NextFunction, Request, RequestHandler, Response } from "express";
import { CowService } from "./cow.service";
import catchAsync from "../../../shared/catchAsync";
import ApiError from "../../../errors/ApiError";
import { pick } from "../../../shared/pick";

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
  const paginationOptions = pick(req.query, [
    "page",
    "limit",
    "sortBy",
    "sortOrder",
  ]);

  const filters = pick(req.query, ["searchTerm", "location", "breed"]);

  const getAllCows = await CowService.getAllCows(paginationOptions, filters);

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
