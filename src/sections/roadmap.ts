import { type ListOptions, ListSection } from './list-section.js';

interface RoadmapItem {
  text: string;
}

export interface RoadmapOptions extends Partial<ListOptions> {}

export class Roadmap extends ListSection<RoadmapItem> {
  constructor(options?: RoadmapOptions) {
    super({
      title: options?.title ?? 'Roadmap',
      type: 'Unordered',
      ...options,
    });
  }

  protected itemMapper(item: RoadmapItem): string {
    return item.text;
  }
}

export function roadmapSection(options?: RoadmapOptions) {
  return new Roadmap(options);
}
