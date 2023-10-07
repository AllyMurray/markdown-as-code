import { DocumentSection } from './section.js';
import { heading } from '../syntax/heading.js';
import { orderedList, unorderedList } from '../syntax/list.js';

type ListType = 'None' | 'Ordered' | 'Unordered';

export abstract class ListSection<ListItem> extends DocumentSection {
  protected items: Array<ListItem> = [];

  constructor(title: string, private type: ListType) {
    super({ title });
  }

  public add(item: ListItem) {
    this.items.push(item);
    return this;
  }

  protected abstract itemMapper(item: ListItem): string;

  protected synthesizeContent(): Array<string> {
    const items = this.items.map((item) => this.itemMapper(item));
    let listItems: string;
    switch (this.type) {
      case 'Ordered':
        listItems = orderedList(items);
        break;
      case 'Unordered':
        listItems = unorderedList(items);
        break;
      case 'None':
        listItems = items.join('\n\n');
        break;
    }

    return [heading(2, this.title), '', listItems];
  }
}
