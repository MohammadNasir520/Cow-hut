import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { ILoginUser } from "./UserAuth.interface";

const createUser = async (userData: IUser): Promise<IUser> => {
  const createUser = await User.create(userData);
  return createUser;
};

const loginUser = async (payload: ILoginUser) => {
  const { phoneNumber, password } = payload;
  const isUserExist = await User.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1 }
  ).lean();

  console.log(isUserExist);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const isPassWordMatched = await bcrypt.compare(
    password,
    isUserExist.password
  );

  if (!isPassWordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "invalid password");
  }

  // creating accessToken
  const { _id, role } = isUserExist;

  console.log(role);

  const accessToken = jwt.sign({ _id, role }, config.jwt.secret as Secret, {
    expiresIn: config.jwt.expires_in as string,
  });
  const refreshToken = jwt.sign(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    { expiresIn: config.jwt.refresh_expires_in as string }
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const UserAuthService = {
  createUser,
  loginUser,
};
