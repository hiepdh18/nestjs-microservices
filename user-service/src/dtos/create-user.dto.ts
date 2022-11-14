import { DTOMapper, MapFrom } from '../common/base/baseDtoMapper';

export class CreateUserDto extends DTOMapper {
  @MapFrom()
  email: string;

  @MapFrom()
  password?: string;

  @MapFrom()
  name: string;
}
