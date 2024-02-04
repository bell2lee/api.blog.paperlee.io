import {
  PostQueryRepository,
  PostSummary,
  PostValueObject,
} from '../../../application/post/queries/post.query.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PostEventRepository } from './post-event.repository';
import { Post } from '../../../domain/post/post';

@Injectable()
export class PostQueryRepositoryAdapter implements PostQueryRepository {
  constructor(private readonly postEventRepository: PostEventRepository) {}
  async get(blogId: string, id: string): Promise<PostValueObject | null> {
    const events = await this.postEventRepository.listEvents(blogId, id);
    if (!events.length) {
      return null;
    }
    const post = new Post({ blogId, postId: id }, events);
    return {
      id: post.id,
      content: post.content,
      comments: post.comments.map((comment) => ({
        id: comment.id,
        author: comment.author,
        content: comment.content,
        createdAt: comment.createdAt.getTime(),
      })),
      createdAt: post.createdAt.getTime(),
      updatedAt: post.updatedAt?.getTime(),
    };
  }
  async list(blogId: string): Promise<PostSummary[]> {
    const events = await this.postEventRepository.listCreatedPostEvents(blogId);
    return events.map((post) => ({
      id: post.message.id,
      createdAt: post.meta.publishedAt,
      // TODO 추후 aggregate root cache에서 가져오도록
      content: post.message.content,
    }));
  }
}
