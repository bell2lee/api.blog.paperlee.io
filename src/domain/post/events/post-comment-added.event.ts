import { BaseDomainEvent } from '../../base-domain.event';

type PostCommentAddedEventMessage = {
  blogId: string;
  postId: string;
  id: number;
  author: string;
  content: string;
};

export class PostCommentAddedEvent
  implements
    BaseDomainEvent<
      `posts/${string}/added-comment`,
      PostCommentAddedEventMessage
    >
{
  constructor(
    public readonly topic: `posts/${string}/added-comment`,
    public readonly message: PostCommentAddedEventMessage,
    public readonly meta: {
      publishedAt: number;
      publishedBy: string;
    },
  ) {}
}
