import { GetPostQuery, GetPostQueryHandler } from './get-post.query';
import { PostQueryError } from './post.query.error';

describe('./get-post.query', () => {
  describe('GetPostQuery', () => {
    it('should throw PostQueryError when id is not provided', () => {
      expect(() => new GetPostQuery('', '')).toThrowError(
        'Blog id and Post id is required',
      );
    });
  });

  describe('GetPostQueryHandler', () => {
    const mockGet = vi.fn();
    const subject = new GetPostQueryHandler({
      get: mockGet,
    } as any);
    describe('execute', () => {
      it('should throw error when post is not found', async () => {
        mockGet.mockResolvedValue(null);
        await expect(
          subject.execute(new GetPostQuery('test-blog-id', 'test')),
        ).rejects.toBeInstanceOf(PostQueryError);
      });

      it('should return post when post is found', async () => {
        mockGet.mockResolvedValue({ id: 'test', content: 'test-content' });
        const post = await subject.execute(
          new GetPostQuery('test-blog-id', 'test'),
        );
        expect(post).toEqual({ id: 'test', content: 'test-content' });
      });
    });
  });
});
