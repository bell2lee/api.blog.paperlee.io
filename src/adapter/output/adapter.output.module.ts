import { Module } from '@nestjs/common';
import { PostCommandRepositoryAdapter } from './persistence/post.command.repository.adapter';
import { PostQueryRepositoryAdapter } from './persistence/post.query.repository.adapter';
import { PrismaModule } from './persistence/prisma/prisma.module';
import { PostEventRepository } from './persistence/post-event.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'PostCommandRepository',
      useClass: PostCommandRepositoryAdapter,
    },
    {
      provide: 'PostQueryRepository',
      useClass: PostQueryRepositoryAdapter,
    },
    PostEventRepository,
  ],
  exports: ['PostCommandRepository', 'PostQueryRepository'],
})
export class AdapterOutputModule {}
