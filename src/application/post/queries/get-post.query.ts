import { IQueryHandler } from '@nestjs/cqrs';
import { PostQueryRepository } from './post.query.repository';
import { PostQueryError } from './post.query.error';

export class GetPostQuery {
  constructor(public readonly id: string) {
    if (!id) {
      throw new PostQueryError('Post id is required');
    }
  }
}

export class GetPostQueryHandler implements IQueryHandler<GetPostQuery> {
  constructor(private readonly repository: PostQueryRepository) {}

  async execute(query: GetPostQuery) {
    const post = await this.repository.get(query.id);
    if (!post) {
      throw new PostQueryError('Post not found');
    }
    return post;
  }
}
