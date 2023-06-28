import { ICow } from "./cow.interface";
import { Cow } from "./cow.models";

const createCow = async (CowData: ICow): Promise<ICow> => {
  const createCow = (await Cow.create(CowData)).populate("seller");
  return createCow;
};

const getAllCows = async () => {
  const getAllCows = await Cow.find({});
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
