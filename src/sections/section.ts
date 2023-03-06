/**
 * Represents a markdown document section.
 */
export abstract class DocumentSection {
  constructor(public title: string) {}

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
