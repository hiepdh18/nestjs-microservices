export interface IUser {
  id?: string;
  email: string;
  name: string;
  password?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
