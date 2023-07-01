"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const CowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        enum: [
            "Dhaka",
            "Chattogram",
            "Barishal",
            "Rajshahi",
            "Sylhet",
            "Comilla",
            "Rangpur",
            "Mymensingh",
        ],
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    lebel: {
        type: String,
        enum: ["for sale", "sold out"],
    },
    category: {
        type: String,
        enum: ["Dairy", "Beef", "Seller"],
        required: true,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
exports.Cow = (0, mongoose_1.model)("Cow", CowSchema);
