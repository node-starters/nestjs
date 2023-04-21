import { RequestMiddleware } from './request.middleware';

describe('LoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new RequestMiddleware()).toBeDefined();
  });
});
