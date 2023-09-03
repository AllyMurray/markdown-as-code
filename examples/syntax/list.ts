import { orderedList, unorderedList, taskList } from 'markdown-as-code';

orderedList(['Item 1', 'Item 2', 'Item 3']);

unorderedList(['Item 1', 'Item 2', 'Item 3']);

taskList([
  { description: 'Task 1', complete: true },
  { description: 'Task 2', complete: false },
  { description: 'Task 3', complete: true },
]);
