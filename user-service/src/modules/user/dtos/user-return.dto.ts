import { DTOMapper, MapFrom } from '../../../common/base/BaseDtoMapper';

export class UserReturnDto extends DTOMapper {
  // @MapFrom((data) => data.email.email)
  @MapFrom()
  email: string;

  @MapFrom()
  name: string;
}
