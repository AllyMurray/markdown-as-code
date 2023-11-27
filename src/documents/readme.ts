import { MarkdownDocument, MarkdownOptions } from './markdown.js';
import type { Optional } from '../@types/optional.js';
import { DocumentSection } from '../index.js';
import {
  AcknowledgementOptions,
  Acknowledgements,
  acknowledgementsSection,
} from '../sections/acknowledgements.js';
import {
  ApiReference,
  ApiReferenceOptions,
  apiReferenceSection,
} from '../sections/api-reference.js';
import {
  Appendix,
  AppendixOptions,
  appendixSection,
} from '../sections/appendix.js';
import {
  Authors,
  AuthorsOptions,
  authorsSection,
} from '../sections/authors.js';
import {
  Contributing,
  ContributingOptions,
  contributingSection,
} from '../sections/contributing.js';
import {
  EnvironmentVariables,
  EnvironmentVariablesOptions,
  environmentVariablesSection,
} from '../sections/environment-variables.js';
import {
  Examples,
  ExamplesOptions,
  examplesSection,
} from '../sections/examples.js';
import { FAQ, FAQOptions, faqSection } from '../sections/faq.js';
import {
  Installation,
  InstallationOptions,
  installationSection,
} from '../sections/installation.js';
import {
  Roadmap,
  RoadmapOptions,
  roadmapSection,
} from '../sections/roadmap.js';
import {
  RunLocalOptions,
  RunLocally,
  runLocallySection,
} from '../sections/run-locally.js';
import {
  Support,
  SupportOptions,
  supportSection,
} from '../sections/support.js';

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

  public addInstallationSection(options: InstallationOptions) {
    return this.addSortedSection(installationSection(options));
  }

  public addEnvironmentVariablesSection(options: EnvironmentVariablesOptions) {
    return this.addSortedSection(environmentVariablesSection(options));
  }

  public addRunLocallySection(options: RunLocalOptions) {
    return this.addSortedSection(runLocallySection(options));
  }

  public addRoadmapSection(options: RoadmapOptions) {
    return this.addSortedSection(roadmapSection(options));
  }

  public addApiReferenceSection(options: ApiReferenceOptions) {
    return this.addSortedSection(apiReferenceSection(options));
  }

  public addExamplesSection(options: ExamplesOptions) {
    return this.addSortedSection(examplesSection(options));
  }

  public addFaqSection(options: FAQOptions) {
    return this.addSortedSection(faqSection(options));
  }

  public addSupportSection(options: SupportOptions) {
    return this.addSortedSection(supportSection(options));
  }

  public addAppendixSection(options: AppendixOptions) {
    return this.addSortedSection(appendixSection(options));
  }

  public addAuthorsSection(options: AuthorsOptions) {
    return this.addSortedSection(authorsSection(options));
  }

  public addAcknowledgementsSection(options: AcknowledgementOptions) {
    return this.addSortedSection(acknowledgementsSection(options));
  }

  public addContributingSection(options: ContributingOptions) {
    return this.addSortedSection(contributingSection(options));
  }
}

export const createReadmeDocument = (options: ReadmeOptions) =>
  new Readme(options);
