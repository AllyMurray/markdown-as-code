import { orderedList, taskList, unorderedList } from './list.js';

describe('list', () => {
  it('should return the a list of numbered items', () => {
    expect(orderedList(['First Item', 'Second Item'])).toBe(
      ['1. First Item', '2. Second Item'].join('\n\n')
    );
  });

  it('should return an unordered list of items prefixed with *', () => {
    expect(unorderedList(['First Item', 'Second Item'])).toBe(
      ['* First Item', '* Second Item'].join('\n\n')
    );
  });

  it('should mark the task as complete when complete is true', () => {
    expect(
      taskList([
        {
          description: 'Task Item 1',
          complete: true,
        },
      ])
    ).toBe('- [x] Task Item 1');
  });

  it('should not mark the task as complete when complete is false', () => {
    expect(
      taskList([
        {
          description: 'Task Item 1',
          complete: true,
        },
      ])
    ).toBe('- [x] Task Item 1');
  });

  it('should return a new line separated list of items', () => {
    expect(
      taskList([
        {
          description: 'Task Item 1',
          complete: true,
        },
        {
          description: 'Task Item 2',
        },
      ])
    ).toBe(['- [x] Task Item 1', '- [ ] Task Item 2'].join('\n\n'));
  });

  it('should escape the task list description if it begins with a parenthesis', () => {
    expect(
      taskList([
        {
          description: '(Important) An important task',
          complete: true,
        },
      ])
    ).toBe('- [x] \\(Important) An important task');
  });
});
