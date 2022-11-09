import { UserService } from './../services/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../app.module';

beforeAll(async () => {
  process.env.NODE_ENV = `test`;
});

afterAll(async () => {
  console.log('TEST');
});

describe('AppModule Test', async () => {
  const app: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  it('Should create AppModule', () => {
    expect(app).toBeDefined();
    expect(app.get(AppModule)).toBeInstanceOf(AppModule);
    expect(app.get(UserService)).toBeInstanceOf(UserService);
  });
});
