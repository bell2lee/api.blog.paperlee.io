import { PostComment } from '../../../domain/post/post-comment';
import { CommentAddedEvent } from '../../../domain/post/events/comment-added.event';
import { CommentAddedEventHandler } from './comment-added.event.handler';

describe('./comment-added.event.handler', () => {
  describe('CommentAddedEventHandler', () => {
    describe('handle', () => {
      it('should send email', async () => {
        const postOffice = {
          sendEmail: jest.fn(),
        };
        const handler = new CommentAddedEventHandler(postOffice as any);
        await handler.handle(
          new CommentAddedEvent(
            'posts/1/added-comment',
            new PostComment('author', 'content'),
            {
              publishedAt: 0,
              publishedBy: 'paper',
            },
          ),
        );
        expect(postOffice.sendEmail).toBeCalledWith({
          to: 'paperlee.email@gmail.com',
          subject: 'New comment added',
          content: `New comment added: {"author":"author","content":"content"}`,
          from: 'paperlee.email@gmail.com',
        });
      });
    });
  });
});
