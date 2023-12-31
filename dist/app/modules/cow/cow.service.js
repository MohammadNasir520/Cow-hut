"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const cow_models_1 = require("./cow.models");
const cow_constant_1 = require("./cow.constant");
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const createCow = (CowData) => __awaiter(void 0, void 0, void 0, function* () {
    const createCow = (yield cow_models_1.Cow.create(CowData)).populate("seller");
    return createCow;
});
const getAllCows = (paginationOptions, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder, maxPrice, minPrice } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortOptions = {};
    // for sort asc or desc
    if (sortBy && sortOrder) {
        sortOptions[sortBy] = sortOrder;
    }
    const andConditions = [];
    // for search term
    if (searchTerm) {
        andConditions.push({
            $or: cow_constant_1.CowSearchableFields.map((field) => {
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
    }
    else if (maxPrice) {
        andConditions.push({
            price: { $lte: maxPrice },
        });
    }
    else if (minPrice) {
        andConditions.push({
            price: { $gte: minPrice },
        });
    }
    let whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    const getAllCows = yield cow_models_1.Cow.find(whereCondition)
        .populate("seller")
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);
    const total = yield cow_models_1.Cow.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: getAllCows,
    };
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllCows = yield cow_models_1.Cow.findById(id).populate("seller");
    return getAllCows;
});
const updateCow = (id, sellerId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCow = yield cow_models_1.Cow.findOneAndUpdate({
        _id: id,
        seller: sellerId,
    }, payload, { new: true });
    return updatedCow;
});
const deleteSingleCow = (id, sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteSingleCow = yield cow_models_1.Cow.findOneAndDelete({
        _id: id,
        seller: sellerId,
    });
    return deleteSingleCow;
});
exports.CowService = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteSingleCow,
};
