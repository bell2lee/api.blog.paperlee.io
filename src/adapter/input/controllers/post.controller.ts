import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ListPostQuery } from '../../../application/post/queries/list-post.query';
import { GetPostQuery } from '../../../application/post/queries/get-post.query';
import { CreatePostCommand } from '../../../application/post/commands/create-post.command';

@Controller(`blogs/:blogId/posts`)
export class PostController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  getPosts(@Param('blogId') blogId: string) {
    return this.queryBus.execute(new ListPostQuery(blogId));
  }

  @Get(':id')
  getPost(@Param('blogId') blogId: string, @Param('id') id: string) {
    return this.queryBus.execute(new GetPostQuery(blogId, id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(
    @Param('blogId') blogId: string,
    @Body('id') id: string,
    @Body('content') content: string,
  ) {
    await this.commandBus.execute(
      new CreatePostCommand(blogId, { id, content }),
    );
    return 'create post';
  }
}
