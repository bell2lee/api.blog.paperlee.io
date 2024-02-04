import { Post } from '../../../domain/post/post';
import { PostCommandRepository } from './post.command.repository';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { PostCommandError } from './post.command.error';
import { Inject } from '@nestjs/common';

export class CreatePostCommand implements ICommand {
  constructor(
    public readonly blogId: string,
    public readonly post: {
      id?: string;
      content: string;
    },
  ) {
    this.blogId = blogId.trim();
    this.post.id = post.id?.trim();
    this.post.content = post.content.trim();
    if (!this.blogId || !this.post.content) {
      throw new PostCommandError('Blog id and content is required');
    }
  }
}

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler
  implements ICommandHandler<CreatePostCommand>
{
  constructor(
    @Inject('PostCommandRepository')
    private readonly repository: PostCommandRepository,
  ) {}

  async execute(command: CreatePostCommand): Promise<void> {
    const isExist = await this.repository.isExist(
      command.blogId,
      command.post.id,
    );
    if (isExist) {
      throw new PostCommandError('Post already exists');
    }
    await this.repository.save(
      Post.newPost({
        blogId: command.blogId,
        postId: command.post.id,
        content: command.post.content,
      }),
    );
  }
}
