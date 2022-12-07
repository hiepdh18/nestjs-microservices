import { ApiProperty } from '@nestjs/swagger';
import { DTOMapper } from './../../common/bases/BaseDtoMapper';

class User {
  @ApiProperty({ required: false })
  username?: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  avatar?: string;
}

export class UpdateUserDto extends DTOMapper {
  @ApiProperty()
  id: string;

  @ApiProperty()
  user: User;
}
