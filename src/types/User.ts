// Payment Info
export interface User {
  id: number;
  department_id?: string | null;
  firstname: string;
  lastname: string;
  houseNo?: string | null;
  phoneNumber?: string | null;
  postcode?: string | null;
  stateOfOrigin?: string | null;
  forename?: string | null;
  address1?: string | null;
  address2?: string | null;
  nigeriaAddress?: string | null;
  passportNo?: string | null;
  dob?: string | null;
  sex?: string | null;
  others?: string | null;
  email: string;
  email_verified_at: null;
  created_at?: Date;
  updated_at?: Date;
  token: string;
}
export interface SignInResponse {
  user: {
    id: number;
    department_id?: string | null;
    firstname: string;
    lastname: string;
    houseNo?: string | null;
    phoneNumber?: string | null;
    postcode?: string | null;
    stateOfOrigin?: string | null;
    forename?: string | null;
    address1?: string | null;
    address2?: string | null;
    nigeriaAddress?: string | null;
    passportNo?: string | null;
    dob?: string | null;
    sex?: string | null;
    others?: string | null;
    email: string;
    email_verified_at: null;
    created_at?: Date;
    updated_at?: Date;
  };
  token: string;
}
