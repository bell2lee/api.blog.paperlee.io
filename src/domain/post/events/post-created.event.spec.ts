import { PostCreatedEvent } from './post-created.event';

describe('./post-created.event', () => {
  it('should has content', () => {
    expect(
      new PostCreatedEvent('posts/1/created', { id: '1', content: 'test' }),
    ).toEqual({
      topic: 'posts/1/created',
      message: { id: '1', content: 'test' },
    });
  });
});
