import * as _ from 'lodash';
import 'reflect-metadata';

export function deepFind(obj: any, path: any) {
  const paths = path.split('.');
  let current = obj;
  let i;

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] === undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}

const symbolFromMap = Symbol('SymbolFromMap');

type MapperFunction<A = any, B = any> = (data: A, prop: string) => B;

type MapperClass = new (...args: any[]) => any;

const SIMPLE_MAPPER_FN: MapperFunction = (val) => val;

const getFromFn =
  (propKey: string | MapperFunction) => (model: any, prop: any) =>
    deepFind(model, propKey || prop);

class ValueMappingFailedError extends Error {
  constructor(reason: string) {
    super(`Failed to map value: ${reason}`);
    Error.captureStackTrace(this);
  }
}

interface MapperProp {
  mapper: MapperFunction | MapperClass;
  fromFn: MapperFunction;
  propKey: string;
  isMultiple: boolean;
  defaultVal?: any;
}

interface MapperProps {
  [key: string]: MapperProp;
}

export class DTOMapper<DTOAttributes = any> {
  public mapperProps: MapperProps;

  constructor(data?: DTOAttributes) {
    this.mapData(data);
    Reflect.defineMetadata(symbolFromMap, this.mapData.bind(this), this);
  }

  protected mapData(data: any): any {
    if (!data) return;

    if (this.mapperProps)
      for (const prop of Object.keys(this.mapperProps)) {
        if (this[prop] instanceof DTOMapper) {
          // support deep mapping
          this.mapChild(this, data, prop);
          continue;
        }
        const value = this.getDataFromSource(data, this.mapperProps[prop]);
        if (typeof value !== 'undefined') {
          this[prop] = value;
        }
      }
  }

  private mapChild(object: any, data: any, prop: any): any {
    const value = this.getDataFromSource(data, this.mapperProps[prop]);
    if (typeof object[prop] !== 'undefined') {
      object[prop].from(value);
    }
  }

  private getDataFromSource(data: any, prop: MapperProp): any {
    let preValue = prop.defaultVal;
    try {
      preValue = prop.fromFn(data, prop.propKey);
    } catch (ex) {
      console.log('ERROR MAPPING ATTR', ex);
    }

    const rawValue = !_.isUndefined(preValue) ? preValue : prop.defaultVal;

    if (_.isObject(rawValue) && _.isEmpty(rawValue) && prop.isMultiple) {
      return rawValue;
    }

    const value = prop.isMultiple
      ? this.mapMultipleValue(rawValue, prop.mapper)
      : this.mapValue(rawValue, prop.mapper);
    if (typeof value === 'undefined') return value;
    return value;
  }

  private mapMultipleValue(values: any, mapper: MapperFunction | MapperClass) {
    if (_.isArray(values))
      return values.map((value: any) => this.mapValue(value, mapper));
    else if (_.isObject(values))
      return _.mapValues(values, (value: any) => this.mapValue(value, mapper));

    return this.mapValue(values, mapper);
  }

  private mapValue(value: any, mapper: MapperFunction | MapperClass) {
    try {
      if (this.isClass(mapper)) return new (mapper as MapperClass)(value);
      // eslint-disable-next-line @typescript-eslint/ban-types
      else if (_.isFunction(mapper)) return (mapper as Function)(value);
    } catch (e) {
      throw new ValueMappingFailedError(e.message);
    }
  }

  private isClass(fn: any): boolean {
    return /^\s*class/.test(fn.toString());
  }
}

export function MapFrom(
  fromProp?: string | MapperFunction,
  mapper?: MapperFunction | MapperClass,
  isMultiple?: boolean,
  defaultVal?: any,
) {
  return (target: any, propKey: string) => {
    if (!target.mapperProps) target.mapperProps = {};

    mapper = mapper ? mapper : SIMPLE_MAPPER_FN;
    fromProp = fromProp ? fromProp : propKey;
    const fromFn = _.isFunction(fromProp) ? fromProp : getFromFn(fromProp);
    isMultiple = isMultiple ? true : false;
    target.mapperProps[propKey] = {
      mapper,
      fromFn,
      propKey,
      isMultiple,
      defaultVal,
    };
  };
}

export type IDtoMapper<T = any> = new (source: T) => IDtoMapper<T>;

export function MappedDto(target: any): any {
  // save a reference to the original constructor
  const original = target;
  // the new constructor behaviour
  const f: any = (...args: any[]) => {
    const instance = new original(args);
    if (instance.mapperProps) {
      const mapper = new DTOMapper();
      mapper.mapperProps = instance.mapperProps;
      const __from__ = Reflect.getMetadata(symbolFromMap, mapper);
      __from__(args[0]);
      Object.assign(instance, mapper);
      delete instance.mapperProps;
    }
    return instance;
  };

  // copy prototype so intanceof operator still works
  f.prototype = original.prototype;

  // return new constructor (will override original)
  return f;
}
