export enum PostErrorType {
  POST_NOT_FOUND = 0,
  POST_ALREADY_EXISTS = 1,
}

export class PostError extends Error {
  constructor(
    message: string,
    public readonly type: PostErrorType,
  ) {
    super(message);
    this.name = PostError.name;
  }
}
