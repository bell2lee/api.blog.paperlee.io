import { PostCommandError } from './post.command.error';

describe('./post.command.error', () => {
  it('should has message', () => {
    expect(new PostCommandError('test-message').message).toBe('test-message');
  });
});
