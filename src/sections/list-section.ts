import { DocumentSection } from './section.js';
import { heading, orderedList, unorderedList } from '../index.js';

type ListType = 'Ordered' | 'Unordered';

export abstract class ListSection<ListItem> extends DocumentSection {
  private items: Array<ListItem> = [];

  constructor(title: string, private type: ListType) {
    super(title);
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
    }

    return [heading(2, this.title), '', listItems];
  }
}
