export interface IUpdateUser {
  id: string;
  user: {
    username?: string;
    name?: string;
    email?: string;
    avatar?: string;
  };
}
