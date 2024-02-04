import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { PostError } from '../../../domain/post/errors/post.error';

@Catch(PostError)
export class PostDomainExceptionFilter implements ExceptionFilter {
  catch(exception: PostError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 400;
    return {};
  }
}
