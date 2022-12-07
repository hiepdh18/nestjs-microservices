import { DTOMapper } from './../common/base/BaseDtoMapper';

export class LoginDto extends DTOMapper {
  email: string;
  password: string;
}
