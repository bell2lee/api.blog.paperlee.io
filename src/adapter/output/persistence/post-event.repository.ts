import { PrismaService } from './prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PostCreatedEvent } from '../../../domain/post/events/post-created.event';
import { PostCommentAddedEvent } from '../../../domain/post/events/post-comment-added.event';
import { PostEventSource } from '../../../domain/post/post';

export enum PostEventType {
  CREATED_POST = 'CREATED_POST',
  COMMENT_ADDED = 'COMMENT_ADDED',
}

@Injectable()
export class PostEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  private convertToEvent(
    postId: string,
    event: Awaited<ReturnType<typeof this.prisma.postEvent.findUnique>>,
  ) {
    const { message, meta } = event;
    switch (event.type as PostEventType | string) {
      case PostEventType.CREATED_POST:
        return new PostCreatedEvent(
          `posts/${postId}/created`,
          message as any,
          meta as any,
        );
      case PostEventType.COMMENT_ADDED:
        return new PostCommentAddedEvent(
          `posts/${postId}/added-comment`,
          message as any,
          meta as any,
        );
      default:
        throw new Error('Invalid event type');
    }
  }

  private topicToType(topic: string) {
    if (topic.includes('posts/id/created')) {
      return PostEventType.CREATED_POST;
    }
    if (topic.includes('added-comment')) {
      return PostEventType.COMMENT_ADDED;
    }
    throw new Error('Invalid event topic');
  }

  async save(events: Array<PostEventSource>) {
    for (const event of events) {
      const eventType = this.topicToType(event.topic);

      await this.prisma.postEvent.create({
        data: {
          blogId: event.message.id,
          postId: event.message.id,
          type: eventType,
          message: event.message,
          meta: event.meta,
        },
      });
    }
  }

  async listCreatedPostEvents(
    blogId: string,
  ): Promise<Array<PostCreatedEvent>> {
    const events = await this.prisma.postEvent.findMany({
      where: {
        blogId,
        type: PostEventType.CREATED_POST,
      },
      orderBy: {
        id: 'asc',
      },
    });
    return events.map((event) =>
      this.convertToEvent(event.postId, event),
    ) as Array<PostCreatedEvent>;
  }

  async listEvents(blogId: string, postId: string): Promise<PostEventSource[]> {
    const events = await this.prisma.postEvent.findMany({
      where: {
        blogId: blogId,
        postId: postId,
      },
      orderBy: {
        id: 'asc',
      },
    });
    return events.map((event) => this.convertToEvent(postId, event));
  }
}
