import { Module } from '@nestjs/common';
import { PostCommandRepositoryAdapter } from './post.command.repository.adapter';
import { PostQueryRepositoryAdapter } from './post.query.repository.adapter';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [],
  providers: [
    {
      provide: 'PostCommandRepository',
      useClass: PostCommandRepositoryAdapter,
    },
    {
      provide: 'PostQueryRepository',
      useClass: PostQueryRepositoryAdapter,
    },
  ],
  exports: ['PostCommandRepository', 'PostQueryRepository'],
})
export class PersistenceModule {}
