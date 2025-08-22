export interface Role {
  id: number;
  name: string;
}

export interface User {
  id?: number;
  full_name: string;
  email: string;
  roles: Role[];
}

export interface UserFormData {
  full_name: string;
  email: string;
  roles: number[];
}

export interface UsersByRole {
  [role: string]: User[];
}
