import { IPaginationOptions } from "../modules/interface/pagination";

const calculatePagination = (paginationOptions: IPaginationOptions) => {
  const page = paginationOptions.page || 1;
  const limit = paginationOptions.limit || 5;
  const skip = (page - 1) * limit;

  const sortBy = paginationOptions.sortBy || "createdAt";
  const sortOrder = paginationOptions.sortOrder || "desc";

  const maxPrice = paginationOptions.maxPrice;
  const minPrice = paginationOptions.minPrice;

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
    maxPrice,
    minPrice,
  };
};

export const paginationHelpers = { calculatePagination };
