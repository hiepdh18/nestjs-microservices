import { RmqContext } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from 'src/app.controller';
import { CreateUserDto } from 'src/dtos/create-user.dto';

beforeAll(async () => {
  process.env.NODE_ENV = `test`;
});

afterAll(async () => {
  console.log('TEST');
});

describe('AppController Test', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(
        appController.createUser(new CreateUserDto(), new RmqContext()),
      ).toBeDefined();
    });
  });
});
