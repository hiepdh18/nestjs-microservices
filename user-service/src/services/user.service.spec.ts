import { CreateUserDto } from './../dtos/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { services } from '../common/constant/constants';
import config from '../configs/typeorm.config';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service';
import { IUser } from '../interfaces/user.interface';
import { User } from '../entities/user.entity';
import { UserReturnDto } from '../dtos/user-return.dto';

describe(`UserService Test`, () => {
  let userService: UserService;

  const mockUserRepo = {
    create: jest.fn().mockImplementation(() =>
      Promise.resolve({
        email: 'x',
        name: 'x',
        password: 'x',
      }),
    ),
    save: jest.fn().mockImplementation(() =>
      Promise.resolve({
        email: 'x',
        name: 'x',
        password: 'x',
      }),
    ),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [
        UserService,
        UserRepository,
        { provide: services.authService, useValue: {} },
      ],
    })
      .overrideProvider(UserRepository)
      .useValue(mockUserRepo)
      .compile();

    userService = module.get<UserService>(UserService);
  });
  it(`Should be defined`, () => {
    expect(userService).toBeDefined();
  });
  it(`Should create new User`, async () => {
    const body: IUser = {
      email: 'x',
      name: 'x',
      password: 'x',
    };
    const user = await userService.createUser(body);
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(UserReturnDto);
  });
});
