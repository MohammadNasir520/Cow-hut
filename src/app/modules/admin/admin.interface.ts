export type IAdmin = {
  phoneNumber: string;
  role: "admin";
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
};

export type ILoginAdmin = {
  phoneNumber: string;
  password: string;
};

export type ILoginAdminResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

// export type IVerifiedLoginAdmin = {
//   AdminPhoneNumber: string;
//   role: ENUM_Admin_ROLE;
// };
