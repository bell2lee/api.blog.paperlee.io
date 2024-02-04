import { HttpException } from '@nestjs/common';

export enum PostQueryErrorType {
  ARGUMENTS_INVALID = 0,
}

export class PostCommandError extends HttpException {
  constructor(
    message: string,
    public readonly type?: PostQueryErrorType,
  ) {
    super(message, 400);
    this.name = PostCommandError.name;
  }
}
