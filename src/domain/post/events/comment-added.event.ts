import { BaseDomainEvent } from '../../base-domain.event';
import { PostComment } from '../post-comment';

export class CommentAddedEvent
  implements BaseDomainEvent<`posts/${string}/added-comment`, PostComment>
{
  constructor(
    public readonly topic: `posts/${string}/added-comment`,
    public readonly message: PostComment,
    public readonly meta: {
      publishedAt: number;
      publishedBy: string;
    },
  ) {}
}
