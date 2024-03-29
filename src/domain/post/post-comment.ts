import { BaseDomainError } from '../base-domain.error';

export class CommentError extends BaseDomainError {
  constructor(message: string) {
    super(message);
  }
}
export class PostComment {
  constructor(
    public readonly id: number,
    public readonly author: string,
    public readonly content: string,
    public readonly createdAt: Date,
  ) {
    if (!author.trim() || !content.trim()) {
      throw new CommentError('Author and content must not be empty');
    }
  }
}
