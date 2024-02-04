import { Module } from '@nestjs/common';
import { GetPostQueryHandler } from './queries/get-post.query';
import { ListPostQueryHandler } from './queries/list-post.query';
import { CreatePostCommandHandler } from './commands/create-post.command';
import { AdapterOutputModule } from '../../adapter/output/adapter.output.module';

@Module({
  imports: [AdapterOutputModule],
  providers: [
    GetPostQueryHandler,
    ListPostQueryHandler,
    CreatePostCommandHandler,
  ],
})
export class PostApplicationModule {}
