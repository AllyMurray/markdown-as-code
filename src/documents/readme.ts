import { MarkdownDocument, MarkdownOptions } from './markdown.js';
import { Acknowledgements } from '../sections/acknowledgements.js';
import { ApiReference } from '../sections/api-reference.js';
import { Appendix } from '../sections/appendix.js';
import { Authors } from '../sections/authors.js';
import { Contributing } from '../sections/contributing.js';
import { EnvironmentVariables } from '../sections/environment-variables.js';
import { Examples } from '../sections/examples.js';
import {
  getSection,
  Section,
  type InferSection,
  type SectionKey,
  SectionMap,
} from '../sections/factory.js';
import { FAQ } from '../sections/faq.js';
import { Installation } from '../sections/installation.js';
import { Roadmap } from '../sections/roadmap.js';
import { RunLocally } from '../sections/run-locally.js';
import { Support } from '../sections/support.js';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
type ReadmeOptions = Optional<MarkdownOptions, 'title'>;

export type Builder<T> = (section: T) => void;

interface ExecuteBuilder<Section extends SectionKey> {
  builder: (section: InferSection<Section>) => void;

  sortOrder: number;
  type: Section;
}

export class Readme extends MarkdownDocument {
  private createdSections = new Map<SectionKey, Section>();

  constructor(options: ReadmeOptions) {
    super({
      ...options,
      title: options.title ?? 'README.md',
    });
  }

  private executeBuilder<Section extends SectionKey>({
    builder,
    type,
    sortOrder,
  }: ExecuteBuilder<Section>) {
    let section = this.createdSections.get(type) as
      | ReturnType<SectionMap[Section]>
      | undefined;

    if (!section) {
      section = getSection(type);
      this.createdSections.set(type, section);
      this.addSection({ section: section, sortOrder });
    }

    builder(section);
    return this;
  }

  public installation(builder: Builder<Installation>) {
    return this.executeBuilder({
      type: 'installation',
      sortOrder: 0,
      builder,
    });
  }

  public environmentVariables(builder: Builder<EnvironmentVariables>) {
    return this.executeBuilder({
      type: 'environmentVariables',
      sortOrder: 1,
      builder,
    });
  }

  public runLocally(builder: Builder<RunLocally>) {
    return this.executeBuilder({
      type: 'runLocal',
      sortOrder: 2,
      builder,
    });
  }

  public roadmap(builder: Builder<Roadmap>) {
    return this.executeBuilder({
      type: 'roadmap',
      sortOrder: 3,
      builder,
    });
  }

  public apiReference(builder: Builder<ApiReference>) {
    return this.executeBuilder({
      type: 'apiReference',
      sortOrder: 4,
      builder,
    });
  }

  public examples(builder: Builder<Examples>) {
    return this.executeBuilder({
      type: 'examples',
      sortOrder: 5,
      builder,
    });
  }

  public faq(builder: Builder<FAQ>) {
    return this.executeBuilder({
      type: 'faq',
      sortOrder: 6,
      builder,
    });
  }

  public support(builder: Builder<Support>) {
    return this.executeBuilder({
      type: 'support',
      sortOrder: 7,
      builder,
    });
  }

  public appendix(builder: Builder<Appendix>) {
    return this.executeBuilder({
      type: 'appendix',
      sortOrder: 8,
      builder,
    });
  }

  public authors(builder: Builder<Authors>) {
    return this.executeBuilder({
      type: 'authors',
      sortOrder: 9,
      builder,
    });
  }

  public acknowledgements(builder: Builder<Acknowledgements>) {
    return this.executeBuilder({
      type: 'acknowledgements',
      sortOrder: 10,
      builder,
    });
  }

  public contributing(builder: Builder<Contributing>) {
    return this.executeBuilder({
      type: 'contributing',
      sortOrder: 11,
      builder,
    });
  }
}

export const createReadmeDocument = (options: ReadmeOptions) =>
  new Readme(options);
