type Task = { description: string; complete?: boolean };

export const orderedList = (items: Array<string>) => {
  return items.map((item, index) => `${index + 1}. ${item}`).join('\n\n');
};

export const unorderedList = (items: Array<string>) => {
  return items.map((item) => `- ${item}`).join('\n\n');
};

export const taskList = (tasks: Array<Task>) => {
  return tasks
    .map((task) => {
      const completeMarker = task.complete ? 'x' : ' ';
      const description = task.description.startsWith('(')
        ? `\\${task.description}`
        : task.description;
      return `- [${completeMarker}] ${description}`;
    })
    .join('\n\n');
};
