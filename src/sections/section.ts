import { InferSection, SectionKey } from './factory.js';
import { HeadingLevel } from '../elements/heading.js';

export interface DocumentSectionOptions {
  title: string;
  parent?: DocumentSection;
}

/**
 * Represents a markdown document section.
 */
export abstract class DocumentSection {
  private _subSections: Array<DocumentSection> = [];

  title: string;

  parent: DocumentSection | undefined;

  constructor(options: DocumentSectionOptions) {
    this.title = options.title;
    this.parent = options.parent;
    this.parent?._subSections.push(this);
  }

  get subSections(): ReadonlyArray<DocumentSection> {
    return this._subSections;
  }

  get headingLevel(): HeadingLevel {
    const rootHeadingLevel = 2;
    const maxHeadingLevel = 6;
    const level = this.parent ? this.parent.headingLevel + 1 : rootHeadingLevel;
    return (level > maxHeadingLevel ? maxHeadingLevel : level) as HeadingLevel;
  }

  addSubSection(section: DocumentSection) {
    section.parent = this;
    this._subSections.push(section);
    return this;
  }

  /**
   * Transform the section data into an array of strings
   */
  protected abstract synthesizeContent(): Array<string>;

  /**
   * Synthesize the section data so it can be written to the readme
   */
  public synthesize() {
    return this.synthesizeContent().join('\n');
  }
}

export function tryFindSection<S extends SectionKey>(
  sections: ReadonlyArray<DocumentSection>,
  path: Array<string>,
): InferSection<S> | undefined {
  for (const section of sections) {
    if (section.title === path[0] && path.length === 1) {
      return section as InferSection<S>;
    }

    return tryFindSection(
      section.subSections,
      path.slice(1),
    ) as InferSection<S>;
  }

  return undefined;
}
