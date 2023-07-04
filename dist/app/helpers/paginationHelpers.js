"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelpers = void 0;
const calculatePagination = (paginationOptions) => {
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
exports.paginationHelpers = { calculatePagination };
