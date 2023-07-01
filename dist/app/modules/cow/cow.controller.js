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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowController = void 0;
const cow_service_1 = require("./cow.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = require("../../../shared/pick");
const cow_constant_1 = require("./cow.constant");
const pagination_1 = require("../../constant/pagination");
const createCow = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const CowData = req.body;
    const createCow = yield cow_service_1.CowService.createCow(CowData);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Cow created successfully",
        data: createCow,
    });
}));
const getAllCows = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.pick)(req.query, pagination_1.paginationOptionsField);
    const filters = (0, pick_1.pick)(req.query, cow_constant_1.CowsFilterableFields);
    const getAllCows = yield cow_service_1.CowService.getAllCows(paginationOptions, filters);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Cows retrieved successfully",
        meta: getAllCows.meta,
        data: getAllCows.data,
    });
});
const getSingleCow = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const getAllCows = yield cow_service_1.CowService.getSingleCow(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Cow retrieved successfully",
        data: getAllCows,
    });
}));
const updateCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedDAta = req.body;
    const updatedCow = yield cow_service_1.CowService.updateCow(id, updatedDAta);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Cow updated successfully",
        data: updatedCow,
    });
});
const deleteSingleCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deleteSingleCow = yield cow_service_1.CowService.deleteSingleCow(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Cow deleted successfully",
        data: deleteSingleCow,
    });
});
exports.CowController = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteSingleCow,
};
