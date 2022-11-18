import { DTOMapper } from '../../common/bases/BaseDtoMapper';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto extends DTOMapper {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  birthDay: Date;
}
