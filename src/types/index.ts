export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  roles: Role[];
  created_at?: string;
  updated_at?: string;
}

export interface UserFormData {
  full_name: string;
  email: string;
  roles: number[];
}

export interface UsersByRole {
  [role: string]: User[];
}
