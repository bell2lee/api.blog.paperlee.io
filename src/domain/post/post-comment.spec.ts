import { PostComment, CommentError } from './post-comment';
import { BaseDomainError } from '../base-domain.error';

describe('./post-comment', () => {
  describe('PostComment', () => {
    it.each([
      ['', 'content'],
      ['author', ''],
      ['', ''],
    ])('should throw Comment Error when not set author', (author, content) => {
      expect(() => new PostComment(1, author, content, new Date())).toThrow(
        CommentError,
      );
    });
    it('should has author and cotent when author and content set', () => {
      const now = new Date();
      expect(new PostComment(1, 'author', 'content', now)).toEqual({
        id: 1,
        author: 'author',
        content: 'content',
        createdAt: now,
      });
    });
  });
  describe('CommentError', () => {
    it('should has message', () => {
      expect(new CommentError('message').message).toEqual('message');
    });
    it('should instanceof BaseDomainError', () => {
      expect(new CommentError('message')).toBeInstanceOf(BaseDomainError);
    });
  });
});
