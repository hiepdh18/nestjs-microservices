import {
  context,
  deepFind,
  getExternalPath,
  getRandomFloat,
  getRandomInt,
  isDevEnv,
  isEmpty,
  randomInt,
  randomIntFromInterval,
  randomStr,
  replaceAllNonDigits,
} from './util';

describe(`Util Test`, () => {
  it(`Should check if dev environment`, () => {
    const check = isDevEnv();
    expect(check).toBeDefined();
    expect(typeof check).toBe('boolean');
  });

  it(`Should return a random Integer that inside 1 and 1000`, () => {
    const randomInt = getRandomInt(1, 1000);
    expect(randomInt).toBeDefined();
    expect(typeof randomInt).toBe('number');
    expect(randomInt).toBeGreaterThanOrEqual(1);
    expect(randomInt).toBeLessThanOrEqual(1000);
  });

  it(`Should return a random Float that inside 1 and 100`, () => {
    const randomFloat = getRandomFloat(1, 100);
    expect(randomFloat).toBeDefined();
    expect(typeof randomFloat).toBe('number');
    expect(randomFloat).toBeGreaterThanOrEqual(1);
    expect(randomFloat).toBeLessThanOrEqual(100);
  });

  it(`Should return a random String with length 100`, () => {
    const randomString = randomStr(100);
    expect(randomString).toBeDefined();
    expect(typeof randomString).toBe('string');
    expect(randomString.length).toBe(100);
  });

  it(`Should return a random Integer with length 10`, () => {
    const randInt = randomInt(10);
    expect(randInt).toBeDefined();
    expect(typeof randInt).toBe('number');
  });

  it(`Should replace all non digits`, () => {
    const res = replaceAllNonDigits('2340  ');
    expect(typeof res).toBe('number');
    expect(res).toBe(2340);
  });

  it(`Should return external path`, () => {
    const res = getExternalPath('usr/tm');
    expect(typeof res).toBe('string');
  });

  it(`Should return a random integer from interval`, () => {
    const res = randomIntFromInterval(2, 10);
    expect(typeof res).toBe('number');
  });

  it(`Should return a context`, () => {
    const res = context({ req: '', connection: '' });
    const res2 = context({ req: '', connection: { context: 'hello' } });
    expect(typeof res).toBe('object');
    expect(typeof res2).toBeDefined();
  });

  it(`Should find from object`, () => {
    const obj = {
      name: 'John',
      age: 23,
      sub: {
        prop1: 'hello',
        prop2: 'hi',
      },
    };
    const res1 = deepFind(obj, 'sub.prop1');
    expect(res1).toBeDefined();
    expect(typeof res1).toBe('string');
    expect(res1).toBe('hello');

    const res2 = deepFind(obj, 'hel');
    expect(res2).toBeUndefined();
  });

  it(`Should check if a object is empty`, () => {
    const checkEmptyObject = isEmpty([]);
    expect(checkEmptyObject).toBeDefined();
    expect(typeof checkEmptyObject).toBe('boolean');
    expect(checkEmptyObject).toBe(true);

    const checkNothing = isEmpty(null);
    expect(checkNothing).toBeDefined();
    expect(typeof checkNothing).toBe('boolean');
    expect(checkNothing).toBe(true);

    const checkObject = isEmpty({ prop: 'x' });
    expect(checkObject).toBeDefined();
    expect(typeof checkObject).toBe('boolean');
    expect(checkObject).toBe(false);

    const checkEmptyString = isEmpty('  ');
    expect(checkEmptyString).toBeDefined();
    expect(typeof checkEmptyString).toBe('boolean');
    expect(checkEmptyString).toBe(true);

    const checkString = isEmpty('hello test');
    expect(checkString).toBeDefined();
    expect(typeof checkString).toBe('boolean');
    expect(checkString).toBe(false);

    const checkUndefined = isEmpty(undefined);
    expect(checkUndefined).toBeDefined();
    expect(typeof checkUndefined).toBe('boolean');
    expect(checkUndefined).toBe(true);
  });
});
