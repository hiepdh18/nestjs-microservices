import {
  deepFind,
  DTOMapper,
  MapFrom,
  ValueMappingFailedError,
} from './BaseDtoMapper';

class SimpleMappingDto extends DTOMapper {
  @MapFrom()
  prop: any;
}

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
});

describe('Test BaseDTOMapper.ts', () => {
  describe('Function deepFind', () => {
    it('Should return property', () => {
      const obj: any = {
        name: {
          first: 'Cobby',
          last: 'Do',
        },
      };
      const current = deepFind(obj, 'name.first');
      expect(current).toBe('Cobby');
    });

    it('Should return undefined', () => {
      const obj: any = {
        name: {
          last: 'Hiep',
        },
      };
      const current = deepFind(obj, 'name.first');
      expect(current).toBeUndefined();
    });
  });

  describe(`Class ValueMappingFailedError`, () => {
    it(`Should return error instance`, () => {
      const err = new ValueMappingFailedError('reason');
      expect(err).toBeInstanceOf(ValueMappingFailedError);
    });
  });

  describe('Class DTOMapper', () => {
    it('Should construct without parameter', () => {
      const dto = new SimpleMappingDto();
      expect(dto).toBeInstanceOf(SimpleMappingDto);
    });

    it('Should construct with empty parameter', () => {
      const dto = new SimpleMappingDto({});
      expect(dto).toBeInstanceOf(SimpleMappingDto);
    });

    it('should construct with valid parameter', () => {
      const dto = new SimpleMappingDto({ prop: 1 });
      expect(dto).toEqual({ prop: 1 });
    });
  });
});
