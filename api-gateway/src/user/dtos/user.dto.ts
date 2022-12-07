import { DTOMapper } from './../../common/bases/BaseDtoMapper';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto extends DTOMapper {
  @ApiProperty()
  email: string;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty()
  password: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
