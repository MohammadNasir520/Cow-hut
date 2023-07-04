import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { ILoginUser } from "./UserAuth.interface";
import { jwtHelpers } from "../../helpers/jwtHelpers";

const createUser = async (userData: IUser): Promise<Partial<IUser>> => {
  const createUser = await User.create(userData);

  const { password, ...others } = createUser.toObject();
  return others;
};

const loginUser = async (payload: ILoginUser) => {
  const { phoneNumber, password } = payload;
  const isUserExist = await User.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1 }
  ).lean();

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

const refreshToken = async (token: string) => {
  let verifyToken = null;

  try {
    verifyToken = await jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "invalid token");
  }

  const { _id, role } = verifyToken;

  const isUserExist = await User.isUserExist(_id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.FORBIDDEN, "user does not exist");
  }

  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken };
};

export const UserAuthService = {
  createUser,
  loginUser,
  refreshToken,
};
