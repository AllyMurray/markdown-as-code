import { heading, HeadingLevel } from './heading.js';

describe('heading', () => {
  const headingLevels: Array<HeadingLevel> = [1, 2, 3, 4, 5, 6];
  it.each(headingLevels)(
    'should return the correct syntax for heading %i',
    (level) => {
      expect(heading(level, `Test ${level}`)).toBe(
        `${'#'.repeat(level)} Test ${level}`
      );
    }
  );

  it('should throw if heading level is less than 1', () => {
    expect(() => heading(0 as HeadingLevel, 'Test 1')).toThrowError(
      'level must be between 1 and 6'
    );
  });

  it('should throw if heading level is greater than 6', () => {
    expect(() => heading(7 as HeadingLevel, 'Test 1')).toThrowError(
      'level must be between 1 and 6'
    );
  });
});
