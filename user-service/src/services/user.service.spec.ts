import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { services } from '../common/constant/constants';
import config from '../configs/typeorm.config';
import { UserReturnDto } from '../dtos/user-return.dto';
import { User } from '../entities/user.entity';
import { IUser } from '../interfaces/user.interface';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service';

describe(`UserService Test`, () => {
  let userService: UserService;
  let userRepo: UserRepository;

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
    find: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          email: 'x',
          name: 'x',
          password: 'x',
        },
      ]),
    ),
    findOneBy: jest.fn().mockImplementation(() =>
      Promise.resolve({
        email: 'x',
        name: 'x',
        password: 'x',
      }),
    ),
  };

  beforeAll(async () => {
    console.log(`🔥🔥🔥 => beforeAll`);
  });

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
        { provide: services.authService, useValue: {} },
      ],
    })
      .overrideProvider(UserRepository)
      .useValue(mockUserRepo)
      .compile();

    userService = module.get<UserService>(UserService);
    userRepo = module.get<UserRepository>(UserRepository);
    console.log(`🔥🔥🔥 => beforeEach`);
  });

  afterEach(() => jest.clearAllMocks());

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

  it(`Should throw error if failed to create user`, async () => {
    const body: IUser = {
      email: 'x',
      name: 'x',
      password: 'x',
    };
    const spySave = jest.spyOn(userRepo, 'save');
    // .mockImplementation(() => Promise.reject());
    const res = await userService.createUser(body);
    // expect(res).toThrowError();
    expect(spySave).toBeCalledTimes(1);
  });

  it(`Should return all user`, async () => {
    const spyFind = jest.spyOn(userRepo, 'find');
    const res = await userService.findAllUser();
    expect(res.length).toEqual(1);
    expect(spyFind).toBeCalledTimes(1);
  });

  it(`Should return user`, async () => {
    const spyFind = jest.spyOn(userRepo, 'findOneBy');
    const res = await userService.findOneUser({ name: 'x' });
    expect(res.email).toEqual('x');
    expect(spyFind).toBeCalledTimes(1);
  });

  it(`Should update user`, async () => {
    const spyFind = jest.spyOn(userRepo, 'findOneBy');
    const res = await userService.updateUser('1', { name: 'x' });
    expect(res.email).toEqual('x');
    expect(spyFind).toBeCalledTimes(1);
  });
});
