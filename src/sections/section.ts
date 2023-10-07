export interface DocumentSectionOptions {
  title: string;
  parent?: DocumentSection;
}

/**
 * Represents a markdown document section.
 */
export abstract class DocumentSection {
  subSections: Array<DocumentSection> = [];

  title: string;

  parent: DocumentSection | undefined;

  constructor(options: DocumentSectionOptions) {
    this.title = options.title;
    this.parent = options.parent;
    this.parent?.subSections.push(this);
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

export function tryFindSection<Section extends DocumentSection>(
  sections: Array<DocumentSection>,
  path: Array<string>
): Section | undefined {
  for (const section of sections) {
    if (section.title === path[0] && path.length === 1) {
      return section as Section;
    }

    return tryFindSection(section.subSections, path.slice(1)) as Section;
  }

  return undefined;
}

// export function tryFindSection<Section>(
//   sections: Array<DocumentSection>,
//   path: Array<string>,
//   SectionClass?: new () => DocumentSection
// ) {
//   type ReturnType = typeof SectionClass extends undefined
//     ? DocumentSection
//     : typeof SectionClass;

//   for (const section of sections) {
//     if (section.title === path[0] && path.length === 1) {
//       return section;
//     }

//     if (SectionClass && section instanceof SectionClass) {
//       if (section.title === path[0]) {
//         return section;
//       }
//     }
//     return tryFindSection(section.subSections, path.slice(1));
//   }

//   return undefined;
// }
