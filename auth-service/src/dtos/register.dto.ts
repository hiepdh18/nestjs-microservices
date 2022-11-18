import { DTOMapper } from './../common/base/BaseDtoMapper';

export class RegisterDto extends DTOMapper {
  email: string;
  password: string;
  username: string;
  birthDay: Date;
}
