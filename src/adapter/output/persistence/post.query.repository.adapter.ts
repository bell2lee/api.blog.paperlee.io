import {
  PostQueryRepository,
  PostValueObject,
} from '../../../application/post/queries/post.query.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostQueryRepositoryAdapter implements PostQueryRepository {
  get(id: string): Promise<PostValueObject | null> {
    throw new Error('Method not implemented.');
  }
  list(): Promise<PostValueObject[]> {
    throw new Error('Method not implemented.');
  }
}
