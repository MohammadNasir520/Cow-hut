import { SortOrder } from "mongoose";

export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  maxPrice?: number;
  minPrice?: number;
};

export type sortOptions = { [key: string]: SortOrder };
