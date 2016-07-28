jest.unmock('../http');

import { checkStatus } from '../http';

describe('Http util', () => {
  it('should handle http status code', () => {
    const successResponse = {
      status     : 200,
      statusText : 'OK'
    };
    const redirectResponse = {
      status     : 301,
      statusText : 'Redirect'
    };
    const errorResponse = {
      status     : 400,
      statusText : 'Invalid'
    };

    expect(checkStatus(successResponse)).toBe(successResponse);
    expect(() => checkStatus(successResponse)).not.toThrow();
    expect(() => checkStatus(redirectResponse)).toThrowError(Error);
    expect(() => checkStatus(errorResponse)).toThrowError(Error);
  });
});
