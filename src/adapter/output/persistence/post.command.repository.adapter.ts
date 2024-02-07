import { PostCommandRepository } from '../../../application/post/commands/post.command.repository';
import { Injectable } from '@nestjs/common';
import { Post, PostEventSource } from '../../../domain/post/post';
import { PrismaService } from './prisma/prisma.service';
import { PostEventRepository } from './post-event.repository';

@Injectable()
export class PostCommandRepositoryAdapter implements PostCommandRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventRepository: PostEventRepository,
  ) {}
  async get(blogId: string, postId: string): Promise<Post> {
    throw new Error('Method not implemented.');
  }

  async isExist(blogId: string, postId: string): Promise<boolean> {
    const event = await this.prisma.postEvent.findFirst({
      where: { blogId, postId },
    });
    return Boolean(event);
  }
  async save(post: Post): Promise<void> {
    const uncommittedEvents = post.getUncommittedEvents();
    await this.eventRepository.save(uncommittedEvents as PostEventSource[]);
  }
}
