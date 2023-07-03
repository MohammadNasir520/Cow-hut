import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const createAdmin = async (AdminData: IAdmin): Promise<Partial<IAdmin>> => {
  const createAdmin = await Admin.create(AdminData);

  console.log(createAdmin);
  const { password, ...others } = createAdmin.toObject();
  return others;
};

// const getAllAdmins = async () => {
//   const getAllAdmins = await Admin.find({});
//   return getAllAdmins;
// };
// const getSingleAdmin = async (id: string) => {
//   const getAllAdmins = await Admin.findById(id);
//   return getAllAdmins;
// };
// const deleteSingleAdmin = async (id: string) => {
//   const deleteSingleAdmin = await Admin.findByIdAndDelete(id);
//   return deleteSingleAdmin;
// };
// const updateAdmin = async (id: string, payload: Partial<IAdmin>) => {
//   const { name, ...AdminData } = payload;

//   const AdminUpdatedData = { ...AdminData };

//   if (name && Object.keys(name).length > 0) {
//     Object.keys(name).forEach((key) => {
//       const nameKey = `name.${key}`;
//       (AdminUpdatedData as any)[nameKey] = name[key as keyof typeof name];
//     });
//   }

//   const updatedAdmin = await Admin.findOneAndUpdate(
//     {
//       _id: id,
//     },
//     AdminUpdatedData,
//     { new: true }
//   );
//   return updatedAdmin;
// };

export const AdminService = {
  createAdmin,
  // getAllAdmins,
  // getSingleAdmin,
  // deleteSingleAdmin,
  // updateAdmin,
};
