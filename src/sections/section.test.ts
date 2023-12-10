import {
  DocumentSection,
  DocumentSectionOptions,
  tryFindSection,
} from './section.js';

function createTestSection(options: DocumentSectionOptions) {
  class TestSection extends DocumentSection {
    protected synthesizeContent(): Array<string> {
      return [options.title, ...this.subSections.map((s) => s.synthesize())];
    }
  }

  return new TestSection(options);
}

describe('Test Section', () => {
  it('should return the title', () => {
    expect(createTestSection({ title: 'Test Section' }).synthesize()).toBe(
      'Test Section',
    );
  });

  it('should return the sub sections', () => {
    const section = createTestSection({ title: 'Test Section' });
    section.addSubSection(createTestSection({ title: 'Sub Section' }));
    expect(section.subSections).toHaveLength(1);
  });

  it('should return the heading level', () => {
    expect(createTestSection({ title: 'Test Section' }).headingLevel).toBe(2);
  });

  it('should add itself to the parent', () => {
    const parent = createTestSection({ title: 'Parent Section' });
    const child = createTestSection({ title: 'Child Section', parent });
    expect(parent.subSections).toContain(child);
  });

  it('should return 6 if the maximum level is exceeded', () => {
    const testSection = createTestSection({ title: 'Test Section' });

    createTestSection({ title: 'Level 1' }).addSubSection(
      createTestSection({ title: 'Level 2' }).addSubSection(
        createTestSection({ title: 'Level 3' }).addSubSection(
          createTestSection({ title: 'Level 4' }).addSubSection(
            createTestSection({ title: 'Level 5' }).addSubSection(
              createTestSection({ title: 'Level 5' }).addSubSection(
                testSection,
              ),
            ),
          ),
        ),
      ),
    );

    expect(testSection.headingLevel).toBe(6);
  });
});

describe('tryFindSection', () => {
  it('should return undefined when no sections are provided', () => {
    expect(tryFindSection([], ['Test Section'])).toBeUndefined();
  });

  it('should return undefined when no sections match', () => {
    expect(
      tryFindSection(
        [createTestSection({ title: 'Test Section' })],
        ['Other Section'],
      ),
    ).toBeUndefined();
  });

  it('should return the section when it matches', () => {
    const testSection = createTestSection({ title: 'Test Section' });
    expect(tryFindSection([testSection], ['Test Section'])).toStrictEqual(
      testSection,
    );
  });

  it('should return the section when it matches the path', () => {
    const testSection = createTestSection({ title: 'Test Section' });
    const subSection = createTestSection({ title: 'Sub Section' });
    testSection.addSubSection(subSection);
    expect(
      tryFindSection([testSection], ['Test Section', 'Sub Section']),
    ).toStrictEqual(subSection);
  });

  it('should add single sub section passed in options', () => {
    const testSection = createTestSection({
      title: 'Test Section',
      subSections: [createTestSection({ title: 'Sub Section' })],
    });

    expect(testSection.synthesize()).toMatchInlineSnapshot(`
      "Test Section
      Sub Section"
    `);
  });

  it('should add multiple sub sections passed in options', () => {
    const testSection = createTestSection({
      title: 'Test Section',
      subSections: [
        createTestSection({ title: 'Sub Section 1' }),
        createTestSection({ title: 'Sub Section 2' }),
      ],
    });

    expect(testSection.synthesize()).toMatchInlineSnapshot(`
      "Test Section
      Sub Section 1
      Sub Section 2"
    `);
  });
});
