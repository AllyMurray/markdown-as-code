import { DocumentSection, DocumentSectionOptions } from './section.js';
import { heading } from '../syntax/heading.js';
import { orderedList, unorderedList } from '../syntax/list.js';

export type ListType = 'None' | 'Ordered' | 'Unordered';

export interface ListOptions extends DocumentSectionOptions {
  type: ListType;
}

export abstract class ListSection<ListItem> extends DocumentSection {
  protected items: Array<ListItem> = [];

  constructor(private options: ListOptions) {
    super(options);
  }

  public add(item: ListItem) {
    this.items.push(item);
    return this;
  }

  protected abstract itemMapper(item: ListItem): string;

  protected synthesizeContent(): Array<string> {
    const items = this.items.map((item) => this.itemMapper(item));
    let listItems: string;
    switch (this.options.type) {
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

    return [heading(this.headingLevel, this.title), '', listItems];
  }
}
