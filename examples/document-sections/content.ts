import { contentSection, orderedList } from 'markdown-as-code';

// Create a content section with a title
const section = contentSection('Test Section');

// Add content to the section using the appendContent method
section.appendContent('Some markdown content');

// Use one of the element builders to add content
section.appendContent(orderedList(['item 1', 'item 2']));
