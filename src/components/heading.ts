export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const isInHeadingLevelRange = (level: HeadingLevel) => level >= 1 || level <= 6;

export const heading = (level: HeadingLevel, text: string) => {
  if (isInHeadingLevelRange(level)) {
    return `${'#'.repeat(level)} ${text}`;
  }
  throw new Error('level must be between 1 and 6');
};