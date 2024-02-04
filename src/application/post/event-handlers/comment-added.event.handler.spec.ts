import { PostCommentAddedEvent } from '../../../domain/post/events/post-comment-added.event';
import { CommentAddedEventHandler } from './comment-added.event.handler';

describe('./comment-added.event.handler', () => {
  describe('CommentAddedEventHandler', () => {
    describe('handle', () => {
      it('should send email', async () => {
        const postOffice = {
          sendEmail: vi.fn(),
        };
        const handler = new CommentAddedEventHandler(postOffice as any);
        await handler.handle(
          new PostCommentAddedEvent(
            'posts/1/added-comment',
            {
              id: '1',
              author: 'author',
              content: 'content',
              postId: '1',
              blogId: 'test-blog-id',
            },
            {
              publishedAt: 0,
              publishedBy: 'paper',
            },
          ),
        );
        expect(postOffice.sendEmail).toBeCalledWith({
          to: 'paperlee.email@gmail.com',
          subject: 'New comment added',
          content: expect.any(String),
          from: 'paperlee.email@gmail.com',
        });
      });
    });
  });
});
