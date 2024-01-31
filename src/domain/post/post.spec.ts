import { Post } from './post';
import { PostComment } from './post-comment';

describe('./post', () => {
  describe('Post', () => {
    describe('id', () => {
      it('should return id', () => {
        const post = new Post({
          id: 'id',
          comments: [],
        });
        expect(post.id).toEqual('id');
      });
    });
    describe('comments', () => {
      it('should return comments', () => {
        const post = new Post({
          id: 'id',
          comments: [new PostComment('author', 'content')],
        });
        expect(post.comments).toEqual([new PostComment('author', 'content')]);
      });
    });
    describe('content', () => {
      it('should return content', () => {
        const post = new Post({
          id: 'id',
          content: 'content',
          comments: [],
        });
        expect(post.content).toEqual('content');
      });
    });

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
