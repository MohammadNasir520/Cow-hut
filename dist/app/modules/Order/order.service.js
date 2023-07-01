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
exports.OrderServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_models_1 = require("../cow/cow.models");
const user_model_1 = require("../user/user.model");
const order_model_1 = require("./order.model");
const mongoose_1 = __importDefault(require("mongoose"));
// : Promise<IOrder>
const createOrder = (OrderData) => __awaiter(void 0, void 0, void 0, function* () {
    const buyerId = OrderData.buyer;
    const buyer = yield user_model_1.User.findById(buyerId);
    const buyerBudget = buyer === null || buyer === void 0 ? void 0 : buyer.budget;
    if (!buyer) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Invalid Buyer`);
    }
    const cowId = OrderData.cow;
    const cow = yield cow_models_1.Cow.findById(cowId);
    const cowPrice = cow === null || cow === void 0 ? void 0 : cow.price;
    if (!cow) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `cow is not available`);
    }
    const budgetDeficit = cowPrice - buyerBudget;
    if (buyerBudget < cowPrice) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `You have not enough money. You need more ${budgetDeficit} taka`);
    }
    if ((cow === null || cow === void 0 ? void 0 : cow.label) === "sold out") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `this cow has already sold out`);
    }
    const newBudget = buyerBudget - cowPrice;
    const sellerId = cow === null || cow === void 0 ? void 0 : cow.seller;
    const seller = yield user_model_1.User.findById(sellerId);
    const sellerIncome = seller === null || seller === void 0 ? void 0 : seller.income;
    const sellersNewIncome = sellerIncome + cowPrice;
    let OrderAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const updateCowLabel = yield cow_models_1.Cow.findOneAndUpdate({ _id: cowId }, { label: "sold out" }, { new: true, session });
        const updateBuyersBudget = yield user_model_1.User.findOneAndUpdate({ _id: buyerId }, { budget: newBudget }, { new: true, session });
        console.log(updateBuyersBudget);
        const updateSellersIncome = yield user_model_1.User.findOneAndUpdate({ _id: sellerId }, { income: sellersNewIncome }, { new: true, session });
        const createOrder = yield order_model_1.Order.create([OrderData], { session });
        if (!createOrder) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "failed to create order");
        }
        OrderAllData = createOrder[0];
        yield session.commitTransaction();
        yield session.endSession();
        console.log(updateCowLabel === null || updateCowLabel === void 0 ? void 0 : updateCowLabel.label, updateBuyersBudget === null || updateBuyersBudget === void 0 ? void 0 : updateBuyersBudget.budget);
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (OrderAllData) {
        OrderAllData = yield order_model_1.Order.findOne({ _id: OrderAllData._id })
            .populate("buyer")
            .populate({
            path: "cow",
            populate: [
                {
                    path: "seller",
                },
            ],
        });
    }
    return OrderAllData;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const getAllOrders = yield order_model_1.Order.find()
        .populate("buyer")
        .populate({
        path: "cow",
        populate: [
            {
                path: "seller",
            },
        ],
    });
    return getAllOrders;
});
exports.OrderServices = {
    createOrder,
    getAllOrders,
};
