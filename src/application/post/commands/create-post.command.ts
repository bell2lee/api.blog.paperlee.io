import { Post } from '../../../domain/post/post';
import { PostCommandRepository } from './post.command.repository';
import { ICommandHandler } from '@nestjs/cqrs';
import { PostCommandError } from './post.command.error';
import { Inject } from '@nestjs/common';

export class CreatePostCommand {
  constructor(
    public readonly id: string,
    public readonly content: string,
  ) {
    if (!id) {
      throw new PostCommandError('Post id is required');
    }
  }
}

export class CreatePostCommandHandler
  implements ICommandHandler<CreatePostCommand>
{
  constructor(private readonly repository: PostCommandRepository) {}

  async execute(command: CreatePostCommand): Promise<void> {
    const isExist = await this.repository.isExist(command.id);
    if (isExist) {
      throw new PostCommandError('Post already exists');
    }
    await this.repository.save(Post.newPost(command.id, command.content));
  }
}
