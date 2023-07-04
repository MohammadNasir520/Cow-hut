import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { jwtHelpers } from "../helpers/jwtHelpers";
import { Cow } from "../modules/cow/cow.models";
import { ObjectId } from "mongodb";

const authOrderSpecific =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token from headers
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      // setting user into Express Request. for this must declare an enum which is in global enums folder
      req.user = verifiedUser;
      console.log(verifiedUser);

      // guard by role
      if (
        requiredRoles.length &&
        requiredRoles.includes("specific_buyer") &&
        verifiedUser.role === "buyer"
      ) {
        console.log("specific buyer");
        return next();
      }
      if (
        requiredRoles.length &&
        requiredRoles.includes("specific_seller") &&
        verifiedUser.role === "seller"
      ) {
        console.log("specific seller");
        return next();
      }
      if (
        requiredRoles.length &&
        requiredRoles.includes("admin") &&
        verifiedUser.role === "admin"
      ) {
        console.log("specific admin");
        return next();
      }
      throw new ApiError(httpStatus.UNAUTHORIZED, "unauthorized access");
      //   next();
    } catch (error) {
      next(error);
    }
  };

export default authOrderSpecific;
