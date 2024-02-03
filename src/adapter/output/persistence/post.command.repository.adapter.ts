import { PostCommandRepository } from '../../../application/post/commands/post.command.repository';
import { Injectable } from '@nestjs/common';
import { Post } from '../../../domain/post/post';

@Injectable()
export class PostCommandRepositoryAdapter implements PostCommandRepository {
  get(id: string): Promise<Post> {
    throw new Error('Method not implemented.');
  }

  isExist(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  save(post: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
