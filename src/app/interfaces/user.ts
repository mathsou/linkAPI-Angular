export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt: Date;
}

export interface Res {
  error: boolean;
  id: number;
  message: string;
}
