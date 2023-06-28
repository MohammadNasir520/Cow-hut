import { IPaginationOptions } from "../interface/pagination";
import { ICow } from "./cow.interface";
import { Cow } from "./cow.models";

const createCow = async (CowData: ICow): Promise<ICow> => {
  const createCow = (await Cow.create(CowData)).populate("seller");
  return createCow;
};

const getAllCows = async (paginationOptions: IPaginationOptions) => {
  const page = paginationOptions.page || 1;
  const limit = paginationOptions.limit || 5;

  const skip = (page - 1) * limit;

  const getAllCows = await Cow.find({}).skip(skip).limit(limit);
  return getAllCows;
};
const getSingleCow = async (id: string) => {
  const getAllCows = await Cow.findById(id);
  return getAllCows;
};
const deleteSingleCow = async (id: string) => {
  const deleteSingleCow = await Cow.findByIdAndDelete(id);
  return deleteSingleCow;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  deleteSingleCow,
};
