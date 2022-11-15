import { DTOMapper } from '../../common/bases/BaseDtoMapper';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto extends DTOMapper {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
