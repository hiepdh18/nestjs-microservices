import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.manager);
  }
  gatA() {
    return 1;
  }
}
