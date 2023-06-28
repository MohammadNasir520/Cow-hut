import { ObjectId } from "mongodb";

export type ICow = {
  name: string;
  age: number;
  price: string;
  location:
    | "Dhaka"
    | "Chattogram"
    | "Barishal"
    | "Rajshahi"
    | "Sylhet"
    | "Comilla"
    | "Rangpur"
    | "Mymensingh";

  breed: string;

  weight: number;
  lebel: string;
  category: "Dairy" | "Beef" | "Seller";
  seller: ObjectId;
};

export type CowFilters = {
  searchTerm?: string;
};
