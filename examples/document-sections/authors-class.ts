import { Authors } from 'markdown-as-code';

const content = new Authors()
  .add({ githubUsername: 'JaneDoe' })
  .add({ githubUsername: 'JohnSmith' })
  .synthesize();
