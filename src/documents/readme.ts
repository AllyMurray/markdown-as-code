import { MarkdownDocument, MarkdownOptions } from './markdown.js';
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
import { DocumentSection } from '../sections/section.js';
import { Support } from '../sections/support.js';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
type ReadmeOptions = Optional<MarkdownOptions, 'title'>;

export type Builder<T> = (section: T) => void;

export class Readme extends MarkdownDocument {
  private _acknowledgements?: Acknowledgements;
  private _apiReference?: ApiReference;
  private _appendix?: Appendix;
  private _authors?: Authors;
  private _contributing?: Contributing;
  private _environmentVariables?: EnvironmentVariables;
  private _examples?: Examples;
  private _faq?: FAQ;
  private _installation?: Installation;
  private _roadmap?: Roadmap;
  private _support?: Support;

  constructor(options: ReadmeOptions) {
    super({
      ...options,
      title: options.title ?? 'README.md',
    });
  }

  private executeBuilder<NewSection extends DocumentSection>(
    section: NewSection | undefined,
    SectionClass: new () => NewSection,
    builder: (section: NewSection) => void
  ) {
    if (!section) {
      section = new SectionClass();
      this.addSection(section);
    }
    builder(section);
    return this;
  }

  public acknowledgements(builder: Builder<Acknowledgements>) {
    return this.executeBuilder(
      this._acknowledgements,
      Acknowledgements,
      builder
    );
  }

  public apiReference(builder: Builder<ApiReference>) {
    return this.executeBuilder(this._apiReference, ApiReference, builder);
  }

  public appendix(builder: Builder<Appendix>) {
    return this.executeBuilder(this._appendix, Appendix, builder);
  }

  public authors(builder: Builder<Authors>) {
    return this.executeBuilder(this._authors, Authors, builder);
  }

  public contributing(builder: Builder<Contributing>) {
    return this.executeBuilder(this._contributing, Contributing, builder);
  }

  public environmentVariables(builder: Builder<EnvironmentVariables>) {
    return this.executeBuilder(
      this._environmentVariables,
      EnvironmentVariables,
      builder
    );
  }

  public examples(builder: Builder<Examples>) {
    return this.executeBuilder(this._examples, Examples, builder);
  }

  public faq(builder: Builder<FAQ>) {
    return this.executeBuilder(this._faq, FAQ, builder);
  }

  public installation(builder: Builder<Installation>) {
    return this.executeBuilder(this._installation, Installation, builder);
  }

  public roadmap(builder: Builder<Roadmap>) {
    return this.executeBuilder(this._roadmap, Roadmap, builder);
  }

  public support(builder: Builder<Support>) {
    return this.executeBuilder(this._support, Support, builder);
  }
}
