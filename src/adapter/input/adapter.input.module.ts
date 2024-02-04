import { Module } from '@nestjs/common';
import { ControllerModule } from './controllers/controller.module';
import { PostApplicationExceptionFilter } from './exception-filter/post.application.exception-filter';
import { PostDomainExceptionFilter } from './exception-filter/post.domain.exception-filter';

@Module({
  imports: [ControllerModule],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: PostApplicationExceptionFilter,
    },
    {
      provide: 'APP_FILTER',
      useClass: PostDomainExceptionFilter,
    },
  ],
  exports: [],
})
export class AdapterInputModule {}
