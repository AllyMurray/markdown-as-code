import { type ListOptions, ListSection } from './list-section.js';

interface ListItem {
  text: string;
}

function createListSection(options: ListOptions) {
  class TestList extends ListSection<ListItem> {
    protected itemMapper(item: ListItem): string {
      return item.text;
    }
  }

  return new TestList(options);
}

describe('List Section', () => {
  it('should return the title', () => {
    const section = createListSection({ title: 'Test List', type: 'None' });
    expect(section.synthesize()).toBe('## Test List\n\n');
  });

  it('should return the items', () => {
    const section = createListSection({ title: 'Test List', type: 'None' });
    section.add({ text: 'Item 1' }).add({ text: 'Item 2' });
    expect(section.synthesize()).toBe(
      ['## Test List', '', 'Item 1', '', 'Item 2'].join('\n')
    );
  });

  it('should return an ordered list', () => {
    const section = createListSection({ title: 'Test List', type: 'Ordered' });
    section.add({ text: 'Item 1' }).add({ text: 'Item 2' });
    expect(section.synthesize()).toBe(
      ['## Test List', '', '1. Item 1', '', '2. Item 2'].join('\n')
    );
  });

  it('should return an unordered list', () => {
    const section = createListSection({
      title: 'Test List',
      type: 'Unordered',
    });
    section.add({ text: 'Item 1' }).add({ text: 'Item 2' });
    expect(section.synthesize()).toBe(
      ['## Test List', '', '- Item 1', '', '- Item 2'].join('\n')
    );
  });

  it('should allow for custom titles', () => {
    const section = createListSection({
      title: 'Test List',
      type: 'Unordered',
    });
    expect(section.synthesize()).toBe('## Test List\n\n');
  });
});
