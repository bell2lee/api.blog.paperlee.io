import { PostComment } from "../../../domain/post/post-comment";
import { CommentAddedEvent } from "../../../domain/post/events/comment-added.event";
import { CommentAddedEventHandler } from "./comment-added.event.handler";

describe('./comment-added.event.handler', () => {
  describe('CommentAddedEventHandler', () => {
    describe('handle', () => {
      it('should send email', async () => {
        const postOffice = {
          sendEmail: jest.fn(),
        };
        const handler = new CommentAddedEventHandler(postOffice as any);
        await handler.handle(
          new CommentAddedEvent('topic', new PostComment('author', 'content')),
        );
        expect(postOffice.sendEmail).toBeCalledWith({
          to: '
  });
});
