import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.manager);
  }
  gatA() {
    return 1;
  }
}
// Expect to create a generic of BaseRepository

// @Injectable()
// export class UserRepository extends BaseRepository<User> {}
