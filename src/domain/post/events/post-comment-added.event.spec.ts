import { PostCommentAddedEvent } from './post-comment-added.event';

describe('./comment-added-event', () => {
  describe('CommentAddedEvent', () => {
    it('should has topic and message', () => {
      expect(
        new PostCommentAddedEvent(
          'posts/1/added-comment',
          {
            blogId: 'blog',
            postId: '1',
            id: 1,
            author: 'author',
            content: 'content',
          },
          { publishedAt: 1, publishedBy: 'paper' },
        ),
      ).toEqual({
        topic: 'posts/1/added-comment',
        message: {
          blogId: 'blog',
          postId: '1',
          id: 1,
          author: 'author',
          content: 'content',
        },
        meta: { publishedAt: 1, publishedBy: 'paper' },
      });
    });
  });
});
