import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

  users: Array<any>;

  constructor() {
    this.users = [];
  }

  addUser(user: any): any {
    this.users.push(user);
    return this.users[this.users.length - 1];
  }

  getList(): Array<any> {
    return this.users;
  }
  
}
