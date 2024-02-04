import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostQueryRepository, PostSummary } from './post.query.repository';
import { Inject } from '@nestjs/common';

export class ListPostQuery implements IQuery {
  constructor(public readonly blogId: string) {
    if (!blogId.trim()) {
      throw new Error('Blog id is required');
    }
    this.blogId = blogId;
  }
}

@QueryHandler(ListPostQuery)
export class ListPostQueryHandler implements IQueryHandler {
  constructor(
    @Inject('PostQueryRepository')
    private readonly postQueryRepository: PostQueryRepository,
  ) {}

  async execute(query: ListPostQuery): Promise<PostSummary[]> {
    const posts = await this.postQueryRepository.list(query.blogId);
    return posts;
  }
}
