import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostQueryRepository } from './post.query.repository';
import { PostQueryError } from './post.query.error';
import { Inject } from '@nestjs/common';

export class GetPostQuery implements IQuery {
  constructor(
    public readonly blogId: string,
    public readonly id: string,
  ) {
    this.blogId = blogId.trim();
    this.id = id.trim();
    if (!this.blogId || !this.id) {
      throw new PostQueryError('Blog id and Post id is required');
    }
  }
}

@QueryHandler(GetPostQuery)
export class GetPostQueryHandler implements IQueryHandler<GetPostQuery> {
  constructor(
    @Inject('PostQueryRepository')
    private readonly repository: PostQueryRepository,
  ) {}

  async execute(query: GetPostQuery) {
    const post = await this.repository.get(query.blogId, query.id);
    if (!post) {
      throw new PostQueryError('Post not found');
    }
    return post;
  }
}
