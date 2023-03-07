import { Support } from './support.js';

describe('support', () => {
  it('should return the correct syntax for the title and content', () => {
    expect(new Support().appendContent('Test content').synthesize()).toBe(
      ['## Support', '', 'Test content'].join('\n')
    );
  });
});
