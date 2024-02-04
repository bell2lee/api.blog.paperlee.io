import { IEventHandler } from '@nestjs/cqrs';
import { PostCommentAddedEvent } from '../../../domain/post/events/post-comment-added.event';
import { EmailPostOffice } from '../../email-post-office';

export class CommentAddedEventHandler
  implements IEventHandler<PostCommentAddedEvent>
{
  constructor(private readonly postOffice: EmailPostOffice) {}

  async handle(event: PostCommentAddedEvent) {
    await this.postOffice.sendEmail({
      to: 'paperlee.email@gmail.com',
      subject: 'New comment added',
      content: `New comment added: ${JSON.stringify(event.message)}`,
      from: 'paperlee.email@gmail.com',
    });
  }
}
