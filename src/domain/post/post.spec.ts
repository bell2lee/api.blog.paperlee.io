import { Post } from './post';
import { PostComment } from './post-comment';
import { PostCreatedEvent } from './events/post-created.event';
import { PostCommentAddedEvent } from './events/post-comment-added.event';

describe('./post', () => {
  describe('Post', () => {
    describe('id', () => {
      it('should return id', () => {
        const post = new Post({ postId: 'id', blogId: 'test-blog-id' }, []);
        expect(post.id).toEqual('id');
      });
    });
    describe('comments', () => {
      it('should return comments', () => {
        const now = new Date();
        const post = new Post({ postId: 'id', blogId: 'test-blog-id' }, [
          new PostCreatedEvent(
            'posts/id/created',
            { id: 'id', content: 'content', blogId: 'test-blog-id' },
            { publishedAt: 0, publishedBy: 'paper' },
          ),
          new PostCommentAddedEvent(
            'posts/id/added-comment',
            {
              blogId: 'test-blog-id',
              postId: 'id',
              id: 1,
              author: 'author',
              content: 'content',
            },
            { publishedAt: now.getTime(), publishedBy: 'paper' },
          ),
        ]);
        expect(post.comments).toEqual([
          new PostComment(1, 'author', 'content', now),
        ]);
      });
    });
    describe('content', () => {
      it('should return content', () => {
        const post = new Post({ postId: 'id', blogId: 'test-blog-id' }, [
          new PostCreatedEvent(
            'posts/id/created',
            { id: 'id', content: 'content', blogId: 'test-blog-id' },
            { publishedAt: 0, publishedBy: 'paper' },
          ),
        ]);
        expect(post.content).toEqual('content');
      });
    });

    describe('addComment', () => {
      it('should apply PostCommentAddedEvent', () => {
        const post = new Post({ postId: 'id', blogId: 'test-blog-id' }, [
          new PostCreatedEvent(
            'posts/id/created',
            { id: 'id', content: 'content', blogId: 'test-blog-id' },
            { publishedAt: 0, publishedBy: 'paper' },
          ),
        ]);
        post.addComment(new PostComment(1, 'author', 'content', new Date()));
        expect(post.getUncommittedEvents()).toEqual([
          {
            topic: 'posts/id/added-comment',
            message: {
              blogId: 'test-blog-id',
              id: 1,
              postId: 'id',
              author: 'author',
              content: 'content',
            },
            meta: { publishedAt: expect.any(Number), publishedBy: 'author' },
          },
        ]);
      });
      it('should has comment', () => {
        const now = new Date();
        const post = new Post({ postId: 'id', blogId: 'test-blog-id' }, [
          new PostCreatedEvent(
            'posts/id/created',
            { id: 'id', content: 'content', blogId: 'test-blog-id' },
            { publishedAt: 0, publishedBy: 'paper' },
          ),
        ]);
        post.addComment(new PostComment(1, 'author', 'content', now));
        expect(post.comments).toEqual([
          new PostComment(1, 'author', 'content', now),
        ]);
      });
    });
  });
});
