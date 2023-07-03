import { NextFunction, Request, RequestHandler, Response } from "express";
import { CowService } from "./cow.service";
import catchAsync from "../../../shared/catchAsync";
import ApiError from "../../../errors/ApiError";
import { pick } from "../../../shared/pick";
import { CowsFilterableFields } from "./cow.constant";
import { paginationOptionsField } from "../../constant/pagination";
import httpStatus from "http-status";

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
  const paginationOptions = pick(req.query, paginationOptionsField);

  const filters = pick(req.query, CowsFilterableFields);

  const getAllCows = await CowService.getAllCows(paginationOptions, filters);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Cows retrieved successfully",
    meta: getAllCows.meta,
    data: getAllCows.data,
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

const updateCow = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const sellerId = req.user?._id;

  const updatedDAta = req.body;
  const updatedCow = await CowService.updateCow(id, sellerId, updatedDAta);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Cow updated successfully",
    data: updatedCow,
  });
};

const deleteSingleCow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const sellerId = req.user?._id;
  const deleteSingleCow = await CowService.deleteSingleCow(id, sellerId);

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
  updateCow,
  deleteSingleCow,
};
