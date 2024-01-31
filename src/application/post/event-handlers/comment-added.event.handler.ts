import { IEventHandler } from '@nestjs/cqrs';
import { CommentAddedEvent } from '../../../domain/post/events/comment-added.event';
import { EmailPostOffice } from '../../email-post-office';

export class CommentAddedEventHandler
  implements IEventHandler<CommentAddedEvent>
{
  constructor(private readonly postOffice: EmailPostOffice) {}

  async handle(event: CommentAddedEvent) {
    await this.postOffice.sendEmail({
      to: 'paperlee.email@gmail.com',
      subject: 'New comment added',
      content: `New comment added: ${JSON.stringify(event.message)}`,
      from: 'paperlee.email@gmail.com',
    });
  }
}
