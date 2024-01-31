import { Post } from './post';
import { PostComment } from './post-comment';
import { PostCreatedEvent } from './events/post-created.event';
import { CommentAddedEvent } from './events/comment-added.event';

describe('./post', () => {
  describe('Post', () => {
    describe('id', () => {
      it('should return id', () => {
        const post = new Post('id', []);
        expect(post.id).toEqual('id');
      });
    });
    describe('comments', () => {
      it('should return comments', () => {
        const post = new Post('id', [
          new PostCreatedEvent(
            'posts/id/created',
            { id: 'id', content: 'content' },
            { publishedAt: 0, publishedBy: 'paper' },
          ),
          new CommentAddedEvent(
            'posts/id/added-comment',
            { author: 'author', content: 'content' },
            { publishedAt: 0, publishedBy: 'paper' },
          ),
        ]);
        expect(post.comments).toEqual([new PostComment('author', 'content')]);
      });
    });
    describe('content', () => {
      it('should return content', () => {
        const post = new Post('id', [
          new PostCreatedEvent(
            'posts/id/created',
            { id: 'id', content: 'content' },
            { publishedAt: 0, publishedBy: 'paper' },
          ),
        ]);
        expect(post.content).toEqual('content');
      });
    });

    describe('addComment', () => {
      it('should apply CommentAddedEvent', () => {
        const post = new Post('id', [
          new PostCreatedEvent(
            'posts/id/created',
            { id: 'id', content: 'content' },
            { publishedAt: 0, publishedBy: 'paper' },
          ),
        ]);
        post.addComment(new PostComment('author', 'content'));
        expect(post.getUncommittedEvents()).toEqual([
          {
            topic: 'posts/id/added-comment',
            message: { author: 'author', content: 'content' },
            meta: { publishedAt: expect.any(Number), publishedBy: 'author' },
          },
        ]);
      });
      it('should has comment', () => {
        const post = new Post('id', [
          new PostCreatedEvent(
            'posts/id/created',
            { id: 'id', content: 'content' },
            { publishedAt: 0, publishedBy: 'paper' },
          ),
        ]);
        post.addComment(new PostComment('author', 'content'));
        expect(post.comments).toEqual([new PostComment('author', 'content')]);
      });
    });
  });
});
