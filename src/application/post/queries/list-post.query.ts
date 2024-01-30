import { IQueryHandler } from '@nestjs/cqrs';
import { PostQueryRepository, PostValueObject } from './post.query.repository';

export class ListPostQueryHandler implements IQueryHandler {
  constructor(private readonly postQueryRepository: PostQueryRepository) {}

  async execute(): Promise<PostValueObject[]> {
    const posts = await this.postQueryRepository.list();
    return posts;
  }
}
