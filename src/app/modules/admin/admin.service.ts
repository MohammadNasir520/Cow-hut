import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const createAdmin = async (AdminData: IAdmin): Promise<Partial<IAdmin>> => {
  const createAdmin = await Admin.create(AdminData);

  console.log(createAdmin);
  const { password, ...others } = createAdmin.toObject();
  return others;
};



export const AdminService = {
  createAdmin,

};
