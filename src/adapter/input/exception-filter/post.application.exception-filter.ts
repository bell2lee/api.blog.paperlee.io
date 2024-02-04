import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { PostQueryError } from '../../../application/post/queries/post.query.error';
import { PostCommandError } from '../../../application/post/commands/post.command.error';

@Catch(PostQueryError, PostCommandError)
export class PostApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    console.log('PostApplicationExceptionFilter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 400;
    response.json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
