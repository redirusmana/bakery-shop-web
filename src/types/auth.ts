import { Customer } from "./customer";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  firstName: string;
  lastName: string;
}

export interface LoginResponseData {
  accessToken: string;
  expiresAt: string;
  customer: Customer;
}

export interface RegisterResponseData {
  id: string;
  email: string;
}
