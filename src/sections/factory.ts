import { Acknowledgements } from './acknowledgements.js';
import { ApiReference } from './api-reference.js';
import { Appendix } from './appendix.js';
import { Authors } from './authors.js';
import { ContentSection } from './content-section.js';
import { Contributing } from './contributing.js';
import { EnvironmentVariables } from './environment-variables.js';
import { Examples } from './examples.js';
import { FAQ } from './faq.js';
import { Installation } from './installation.js';
import { Roadmap } from './roadmap.js';
import { RunLocally } from './run-locally.js';
import { Support } from './support.js';
import { MapClass, MapKeys, createFactory } from '../factory.js';

const sectionMap = {
  acknowledgements: () => new Acknowledgements(),
  apiReference: () => new ApiReference(),
  appendix: () => new Appendix(),
  authors: () => new Authors(),
  content: () => new ContentSection({ title: 'Content' }),
  contributing: () => new Contributing(),
  environmentVariables: () => new EnvironmentVariables(),
  examples: () => new Examples(),
  faq: () => new FAQ(),
  installation: () => new Installation(),
  roadmap: () => new Roadmap(),
  runLocal: () => new RunLocally(),
  support: () => new Support(),
};

export type SectionMap = typeof sectionMap;
export type SectionKey = MapKeys<SectionMap>;
export type SectionSection = MapClass<SectionMap, SectionKey>;
export type Section = MapClass<SectionMap, SectionKey>;
export type InferSection<T extends SectionKey> = MapClass<SectionMap, T>;

export const getSection = createFactory(sectionMap);
