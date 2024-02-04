import { BaseDomainEvent } from '../../base-domain.event';

export class PostCreatedEvent
  implements
    BaseDomainEvent<
      `posts/${string}/created`,
      {
        id: string;
        content: string;
      }
    >
{
  constructor(
    public readonly topic: `posts/${string}/created`,
    public readonly message: {
      blogId: string;
      id: string;
      content: string;
    },
    public readonly meta: {
      publishedAt: number;
      publishedBy: string;
    },
  ) {}
}
