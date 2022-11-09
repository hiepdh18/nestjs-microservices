import { BackendLogger } from './backend-logger';
describe(`Logger Test`, () => {
  it(`Should create a new BackendLogger instance`, () => {
    const logger = new BackendLogger(`TestLogger`);
    logger.info('x');
    logger.error('x', 'xx');
    logger.warn('x');
    logger.http('x');
    logger.verbose('x');
    logger.debug('x');
    logger.silly('x');
    expect(logger).toBeDefined();
    expect(logger).toBeInstanceOf(BackendLogger);
  });
});
