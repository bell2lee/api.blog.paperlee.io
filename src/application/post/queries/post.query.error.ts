export enum PostQueryErrorType {
  ARGUMENTS_INVALID = 0,
}

export class PostQueryError extends Error {
  constructor(
    message,
    public readonly type?: PostQueryErrorType,
  ) {
    super(message);
    this.name = PostQueryError.name;
  }
}
