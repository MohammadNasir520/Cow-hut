import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { jwtHelpers } from "../helpers/jwtHelpers";
import { Cow } from "../modules/cow/cow.models";
import { ObjectId } from "mongodb";

const auth =
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

      //finding the cow
      const CowId = req.params.id;
      const findCow = await Cow.findById({ _id: CowId }, { seller: 1 });
      if (!findCow) {
        throw new ApiError(httpStatus.NOT_FOUND, "cow not found");
      }

      // checking the seller of posted cow
      if (
        verifiedUser.role === "seller" &&
        requiredRoles.length &&
        requiredRoles.includes("specific_seller")
      ) {
        if (
          new ObjectId(verifiedUser._id).equals(findCow?.seller as ObjectId)
        ) {
          return next();
        } else {
          throw new ApiError(
            httpStatus.FORBIDDEN,
            "you are not the seller of the cow"
          );
        }
      }

      // guard by role
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
