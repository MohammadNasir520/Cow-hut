import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IAdmin, ILoginAdmin, ILoginAdminResponse } from "./admin.interface";
import { Admin } from "./admin.model";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../../config";

const createAdmin = async (AdminData: IAdmin): Promise<Partial<IAdmin>> => {
  const createAdmin = await Admin.create(AdminData);

  console.log(createAdmin);
  const { password, ...others } = createAdmin.toObject();
  return others;
};
// : Promise<Partial<ILoginAdminResponse>>
const loginAdmin = async (payload: ILoginAdmin) => {
  const { phoneNumber, password } = payload;
  const isAdminExist = await Admin.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1 }
  ).lean();

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "admin does not exist");
  }

  const isPassWordMatched = await bcrypt.compare(
    password,
    isAdminExist.password
  );

  console.log(isPassWordMatched);

  if (!isPassWordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "invalid password");
  }

  // creating accessToken
  const { phoneNumber: adminPhoneNumber, role } = isAdminExist;
  const accessToken = jwt.sign(
    { adminPhoneNumber, role },
    config.jwt.secret as Secret,
    { expiresIn: config.jwt.expires_in as string }
  );
  const refreshToken = jwt.sign(
    { adminPhoneNumber, role },
    config.jwt.refresh_secret as Secret,
    { expiresIn: config.jwt.refresh_expires_in as string }
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const AdminService = {
  createAdmin,
  loginAdmin,
};
