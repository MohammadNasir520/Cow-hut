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
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const createUser = yield user_model_1.User.create(userData);
    return createUser;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const getAllUsers = yield user_model_1.User.find({});
    return getAllUsers;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllUsers = yield user_model_1.User.findById(id);
    return getAllUsers;
});
const deleteSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteSingleUser = yield user_model_1.User.findByIdAndDelete(id);
    return deleteSingleUser;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = payload, userData = __rest(payload, ["name"]);
    const userUpdatedData = Object.assign({}, userData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            userUpdatedData[nameKey] = name[key];
        });
    }
    const updatedUser = yield user_model_1.User.findOneAndUpdate({
        _id: id,
    }, userUpdatedData, { new: true });
    return updatedUser;
});
const getProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const id = user._id;
    const role = user.role;
    const findUer = yield user_model_1.User.findOne({ _id: id });
    return findUer;
});
const updateMyProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = payload, userData = __rest(payload, ["name"]);
    const userUpdatedData = Object.assign({}, userData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            userUpdatedData[nameKey] = name[key];
        });
    }
    const updatedUser = yield user_model_1.User.findOneAndUpdate({
        _id: id,
    }, userUpdatedData, { new: true });
    return updatedUser;
});
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteSingleUser,
    updateUser,
    getProfile,
    updateMyProfile,
};
