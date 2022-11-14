import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../repositories/user.repository';
import config from '../configs/typeorm.config';
import { User } from '../entities/user.entity';
describe(`UserRepository Test`, () => {
  let userRepo: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UserRepository],
    }).compile();

    userRepo = module.get<UserRepository>(UserRepository);
  });
  it(`Should be defined`, () => {
    expect(userRepo).toBeDefined();
    const res = userRepo.gatA();
    console.log(`🔥🔥🔥 => it => res`, res);
    expect(res).toBe(1);
  });
  // it(`Should create new User`, async () => {
  //   const user = await userService.createUser(body);
  //   expect(user).toBeDefined();
  //   expect(user).toBeInstanceOf(UserReturnDto);
  // });
});
