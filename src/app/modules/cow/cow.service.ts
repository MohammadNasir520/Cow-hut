import { SortOrder } from "mongoose";
import { IPaginationOptions, sortOptions } from "../interface/pagination";
import { CowFilters, ICow } from "./cow.interface";
import { Cow } from "./cow.models";

const createCow = async (CowData: ICow): Promise<ICow> => {
  const createCow = (await Cow.create(CowData)).populate("seller");
  return createCow;
};

const getAllCows = async (
  paginationOptions: IPaginationOptions,
  filters: CowFilters
) => {
  const { searchTerm, ...filtersData } = filters;

  const page = paginationOptions.page || 1;
  const limit = paginationOptions.limit || 5;
  const skip = (page - 1) * limit;

  const sortBy = paginationOptions.sortBy || "createdAt";
  const sortOrder = paginationOptions.sortOrder || "desc";

  const sortOptions: sortOptions = {};

  if (sortBy && sortOrder) {
    sortOptions[sortBy] = sortOrder;
  }

  const CowSearchableFields = [
    "name",
    "price",
    "location",
    "breed",
    "category",
  ];

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: CowSearchableFields.map((field) => {
        return {
          [field]: {
            $regex: searchTerm,
            $options: "i",
          },
        };
      }),
    });
  }

  // if (Object.keys(filtersData).length) {
  //   andConditions.push({
  //     $and: Object.entries(filtersData).map(([field, value]) => ({
  //       [field]: value,
  //     })),
  //   });
  // }
  console.log(searchTerm);
  console.log(filtersData);
  console.log(Object.keys(filtersData).length);

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  console.log(andConditions);

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const getAllCows = await Cow.find(whereCondition)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);
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
