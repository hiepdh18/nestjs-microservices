import { DTOMapper, MapFrom } from '../common/base/BaseDtoMapper';

export class CreateUserDto extends DTOMapper {
  @MapFrom()
  email: string;

  @MapFrom()
  password?: string;

  @MapFrom()
  name: string;
}
