import { mentionPerson } from './mention.js';

describe('mentionPerson', () => {
  it('should return the correct syntax for mentioning a person', () => {
    expect(mentionPerson('JaneDoe')).toBe('@JaneDoe');
  });
});
