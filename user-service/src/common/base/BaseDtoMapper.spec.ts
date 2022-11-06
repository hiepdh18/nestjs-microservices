import 'mocha';

// import { expect } from 'chai';
import * as _ from 'lodash';

import { DTOMapper, MapFrom } from './BaseDtoMapper';

class SimpleMappingDto extends DTOMapper {
  @MapFrom()
  prop: any;
}

describe('Base DTOMapper test', () => {
  it('should construct without parameter', () => {
    const dto = new SimpleMappingDto();
    expect(dto).toBeInstanceOf(SimpleMappingDto);
  });

  // it('should construct without empty array with mul false', () => {
  //   class MapperArrayToSimple extends DtoMapper {
  //     @MapFrom('vote', (x) => 1, false, 'xx')
  //     vote: any;
  //   }

  //   const dto = new MapperArrayToSimple({ vote: [] });
  //   expect(dto).to.be.an.instanceOf(MapperArrayToSimple);
  //   expect(dto).to.be.includes({ vote: 1 });
  // });

  // it('should construct with empty parameter', () => {
  //   const dto = new SimpleMappingDto({});
  //   expect(dto).to.be.an.instanceOf(SimpleMappingDto);
  // });

  // it('should construct with valid parameter', () => {
  //   const dto = new SimpleMappingDto({ prop: 1 });
  //   expect(dto).to.includes({ prop: 1 });
  // });

  // it('should construct with zero value', () => {
  //   const dto = new SimpleMappingDto({ prop: 0 });
  //   expect(dto.prop).to.equal(0);
  // });

  // it('should construct with default value', () => {
  //   class SimpleMappingWithDefaultDto extends DtoMapper {
  //     @MapFrom('prop', null, false, 1000)
  //     prop: any;
  //   }

  //   const dto = new SimpleMappingWithDefaultDto({});
  //   expect(dto).to.includes({ prop: 1000 });
  // });

  // it('should construct with prop mapper function', () => {
  //   class SimpleMappingWithPropMapperDto extends DtoMapper {
  //     @MapFrom((data) => data.src)
  //     target: any;
  //   }

  //   const dto = new SimpleMappingWithPropMapperDto({ src: 1 });
  //   expect(dto).to.includes({ target: 1 });
  // });

  // it('should construct with value mapper function', () => {
  //   class SimpleMappingWithValueMapperDto extends DtoMapper {
  //     @MapFrom('src', (value) => value * 2)
  //     target: any;
  //   }

  //   const dto = new SimpleMappingWithValueMapperDto({ src: 1 });
  //   expect(dto).to.includes({ target: 2 });
  // });

  // it('should construct with value mapper class', () => {
  //   class SimpleMappingWithValueDtoMapperDto extends DtoMapper {
  //     @MapFrom('src', SimpleMappingDto)
  //     target: any;
  //   }

  //   const dto = new SimpleMappingWithValueDtoMapperDto({ src: { prop: 1 } });
  //   expect(dto.target).to.be.instanceOf(SimpleMappingDto);
  //   expect(dto.target).to.be.includes({ prop: 1 });
  // });

  // it('should construct with value mapper class array empty value', () => {
  //   class SimpleMappingWithValueDtoMapperDto extends DtoMapper {
  //     @MapFrom('src', SimpleMappingDto, false, {})
  //     target: any;
  //   }

  //   const dto = new SimpleMappingWithValueDtoMapperDto({});
  //   expect(dto.target).to.be.not.null;
  // });

  // it('should construct with value mapper class array', () => {
  //   class SimpleMappingWithValueDtoMapperDto extends DtoMapper {
  //     @MapFrom('src', SimpleMappingDto, true)
  //     target: any;
  //   }

  //   const dto = new SimpleMappingWithValueDtoMapperDto({ src: [{ prop: 1 }] });
  //   expect(dto.target).to.satisfy(function (els) {
  //     return els.every(function (el) {
  //       return expect(el).to.include({ prop: 1 });
  //     });
  //   });
  // });

  // it('should construct with value mapper class collection', () => {
  //   class SimpleMappingWithValueDtoMapperDto extends DtoMapper {
  //     @MapFrom('src', SimpleMappingDto, true)
  //     target: any;
  //   }

  //   const dto = new SimpleMappingWithValueDtoMapperDto({
  //     src: { a: { prop: 1 } },
  //   });
  //   expect(_.values(dto.target)).to.satisfy(function (els) {
  //     return els.every(function (el) {
  //       return expect(el).to.include({ prop: 1 });
  //     });
  //   });
  // });

  // it('should construct with from mappter function', () => {
  //   class SimpleMappingWithFromFnDtoMapper extends DtoMapper {
  //     @MapFrom((data) => data, SimpleMappingDto, false)
  //     tgt: SimpleMappingDto;
  //   }

  //   const dto = new SimpleMappingWithFromFnDtoMapper({
  //     prop: 1,
  //     a: 2,
  //     b: 3,
  //     c: 4,
  //   });
  //   expect(dto.tgt.prop).to.be.eq(1);
  // });
});
