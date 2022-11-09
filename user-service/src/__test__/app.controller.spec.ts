import { UserService } from './../services/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { CreateUserDto } from '../dtos/create-user.dto';

beforeAll(async () => {
  process.env.NODE_ENV = `test`;
});

afterAll(async () => {
  console.log('TEST');
});

describe('AppController Test', () => {
  let appController: AppController;
  const mockUserService = {
    createUser: jest.fn(() => Promise.resolve('')),
    findAllUser: jest.fn(() => Promise.resolve('')),
    findOneUser: jest.fn(() => Promise.resolve('')),
    updateUser: jest.fn(() => Promise.resolve('')),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    appController = app.get<AppController>(AppController);
  });

  it(`Should create AppController`, () => {
    expect(appController.createUser(new CreateUserDto())).toBeDefined();
    expect(appController.getUsers()).toBeDefined();
    expect(appController.getUser(new CreateUserDto())).toBeDefined();
    expect(appController.getUserByEmail(new CreateUserDto())).toBeDefined();
    expect(appController.updateUser({ id: '1', user: {} })).toBeDefined();
  });
});
