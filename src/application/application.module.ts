import { Module } from '@nestjs/common';
import { PostApplicationModule } from './post/post.application.module';

@Module({
  imports: [PostApplicationModule],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
