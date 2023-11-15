import { MarkdownDocument, MarkdownOptions } from './markdown.js';
import { DocumentSection } from '../index.js';
import { Acknowledgements } from '../sections/acknowledgements.js';
import { ApiReference } from '../sections/api-reference.js';
import { Appendix } from '../sections/appendix.js';
import { Authors } from '../sections/authors.js';
import { Contributing } from '../sections/contributing.js';
import { EnvironmentVariables } from '../sections/environment-variables.js';
import { Examples } from '../sections/examples.js';
import { FAQ } from '../sections/faq.js';
import { Installation } from '../sections/installation.js';
import { Roadmap } from '../sections/roadmap.js';
import { RunLocally } from '../sections/run-locally.js';
import { Support } from '../sections/support.js';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
type ReadmeOptions = Optional<MarkdownOptions, 'title'>;

const sectionOrderMap = new Map<object, number>([
  [Installation, 0],
  [EnvironmentVariables, 1],
  [RunLocally, 2],
  [Roadmap, 3],
  [ApiReference, 4],
  [Examples, 5],
  [FAQ, 6],
  [Support, 7],
  [Appendix, 8],
  [Authors, 9],
  [Acknowledgements, 10],
  [Contributing, 11],
]);

export class Readme extends MarkdownDocument {
  constructor(options: ReadmeOptions) {
    super({
      ...options,
      title: options.title ?? 'README.md',
    });
  }

  private getSortOrder(section: DocumentSection) {
    const order = sectionOrderMap.get(section.constructor);
    if (order === undefined) {
      throw new Error('Unknown section type');
    }
    return order;
  }

  private addSortedSection(section: DocumentSection) {
    return this.addSection({ section, sortOrder: this.getSortOrder(section) });
  }

  public addInstallation(section: Installation) {
    return this.addSortedSection(section);
  }

  public addEnvironmentVariables(section: EnvironmentVariables) {
    return this.addSortedSection(section);
  }

  public runLocally(section: RunLocally) {
    return this.addSortedSection(section);
  }

  public roadmap(section: Roadmap) {
    return this.addSortedSection(section);
  }

  public apiReference(section: ApiReference) {
    return this.addSortedSection(section);
  }

  public examples(section: Examples) {
    return this.addSortedSection(section);
  }

  public faq(section: FAQ) {
    return this.addSortedSection(section);
  }

  public support(section: Support) {
    return this.addSortedSection(section);
  }

  public appendix(section: Appendix) {
    return this.addSortedSection(section);
  }

  public authors(section: Authors) {
    return this.addSortedSection(section);
  }

  public acknowledgements(section: Acknowledgements) {
    return this.addSortedSection(section);
  }

  public contributing(section: Contributing) {
    return this.addSortedSection(section);
  }
}

export const createReadmeDocument = (options: ReadmeOptions) =>
  new Readme(options);
