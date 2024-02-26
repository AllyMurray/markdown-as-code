import { writeFileSync } from 'fs';
import { join } from 'path';
import {
  MarkdownDocument,
  MarkdownDocumentOptions,
} from './markdown-document.js';
import { DocumentSection } from './sections/section.js';

export type MarkdownFileOptions = MarkdownDocumentOptions & {
  fileName: string;

  /**
   * The directory the markdown file will be written to
   *
   * @default project root directory
   */
  outDir?: string;
};

export interface AddSection {
  section: DocumentSection;
  sortOrder?: number;
}

export class MarkdownFile extends MarkdownDocument {
  private _outDir: string;

  private _fileName: string;

  constructor(options: MarkdownFileOptions) {
    super(options);

    this._fileName = options.fileName;
    this._outDir = options.outDir ?? process.cwd();
  }

  public get fileName() {
    return this._fileName;
  }

  public get outDir() {
    return this._outDir;
  }

  public get fullFilePath() {
    return join(this._outDir, this._fileName);
  }

  public toFile() {
    writeFileSync(join(this._outDir, this._fileName), this.toString());
  }
}

export const markdownFile = (options: MarkdownFileOptions) =>
  new MarkdownFile(options);
