import { authorsSection } from 'markdown-as-code';

const content = authorsSection()
  .add({ githubUsername: 'JaneDoe' })
  .add({ githubUsername: 'JohnSmith' })
  .synthesize();
