import { SortOrder } from "mongoose";
import {
  IPaginationOptions,
  sortOptions,
} from "../../../interfaces/pagination";
import { CowFilters, ICow } from "./cow.interface";
import { Cow } from "./cow.models";
import { CowSearchableFields } from "./cow.constant";
import { paginationHelpers } from "../../helpers/paginationHelpers";

const createCow = async (CowData: ICow): Promise<ICow> => {
  const createCow = (await Cow.create(CowData)).populate("seller");
  return createCow;
};

const getAllCows = async (
  paginationOptions: IPaginationOptions,
  filters: CowFilters
) => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder, maxPrice, minPrice } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortOptions: sortOptions = {};
  // for sort asc or desc
  if (sortBy && sortOrder) {
    sortOptions[sortBy] = sortOrder;
  }

  const andConditions = [];

  // for search term
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

  // for dynamically filtering data
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // maxPrice or minPrice filtering by price

  if (maxPrice && minPrice) {
    andConditions.push({
      $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }],
    });
  } else if (maxPrice) {
    andConditions.push({
      price: { $lte: maxPrice },
    });
  } else if (minPrice) {
    andConditions.push({
      price: { $gte: minPrice },
    });
  }

  let whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};

  const getAllCows = await Cow.find(whereCondition)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  return {
    meta: {
      page,
      limit,
    },
    data: getAllCows,
  };
};

const getSingleCow = async (id: string) => {
  const getAllCows = await Cow.findById(id);
  return getAllCows;
};

const updateCow = async (id: string, payload: Partial<ICow>) => {
  const updatedCow = await Cow.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    { new: true }
  );
  return updatedCow;
};

const deleteSingleCow = async (id: string) => {
  const deleteSingleCow = await Cow.findByIdAndDelete(id);
  return deleteSingleCow;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteSingleCow,
};
