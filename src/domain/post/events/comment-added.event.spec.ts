import { PostComment } from '../post-comment';
import { CommentAddedEvent } from './comment-added.event';

describe('./comment-added-event', () => {
  describe('CommentAddedEvent', () => {
    it('should has topic and message', () => {
      expect(
        new CommentAddedEvent(
          'posts/1/added-comment',
          new PostComment('author', 'content'),
          { publishedAt: 1, publishedBy: 'paper' },
        ),
      ).toEqual({
        topic: 'posts/1/added-comment',
        message: { author: 'author', content: 'content' },
        meta: { publishedAt: 1, publishedBy: 'paper' },
      });
    });
  });
});
