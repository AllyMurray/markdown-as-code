import { quote } from './quote.js';

describe('quote', () => {
  it('should return the correct syntax for a quote ', () => {
    expect(quote('Test')).toBe('> Test');
  });
});
