import { Post } from './post';
import { PostComment } from './post-comment';

describe('./post', () => {
  describe('Post', () => {
    describe('addComment', () => {
      it('should apply CommentAddedEvent', () => {
        const post = new Post({
          id: 'id',
          comments: [],
        });
        post.addComment(new PostComment('author', 'content'));
        expect(post.domainEvents).toEqual([
          {
            topic: 'posts/id/added-comment',
            message: { author: 'author', content: 'content' },
          },
        ]);
      });
    });
  });
});
