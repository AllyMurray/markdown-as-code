import { ListSection } from './list-section.js';

interface RoadmapItem {
  text: string;
}

export class Roadmap extends ListSection<RoadmapItem> {
  constructor(title?: string) {
    super(title ?? 'Roadmap', 'Unordered');
  }

  protected itemMapper(item: RoadmapItem): string {
    return item.text;
  }
}

export function roadmapSection(title?: string) {
  return new Roadmap(title);
}
