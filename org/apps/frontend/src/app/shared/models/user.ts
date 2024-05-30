interface UserCommon {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface Customer extends UserCommon {
  userType: UserType.Customer;
}

export interface Employee extends UserCommon {
  storeName: string;
  storeTaxId: number;
  status: EmployeeStatus;
  approved: boolean;
  products: string[];
  userType: UserType.Employee;
}

export interface Admin extends UserCommon {
  userType: UserType.Admin;
}

export type User = Customer | Employee | Admin;

export enum UserType {
  Admin = 1,
  Employee = 2,
  Customer = 3,
}

export interface AuthResult {
  accessToken: string;
  user: User;
}

export enum EmployeeStatus {
  blocked = 1,
  active = 2,
}
