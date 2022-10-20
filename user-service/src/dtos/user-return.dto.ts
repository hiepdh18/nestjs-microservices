import { DTOMapper, MapFrom } from 'src/common/base/BaseDtoMapper';

export class UserReturnDto extends DTOMapper {
  // @MapFrom((data) => data.email.email)
  @MapFrom()
  id: string;

  @MapFrom()
  email: string;

  @MapFrom()
  name: string;

  @MapFrom()
  password: string;

  @MapFrom()
  avatar: string;

  @MapFrom()
  createdAt: Date;

  @MapFrom()
  updatedAt: Date;
}
