import { ListPostQuery, ListPostQueryHandler } from './list-post.query';

describe('./list-post.query', () => {
  describe('ListPostQuery', () => {
    it('should throw error when blogId is not provided', () => {
      expect(() => new ListPostQuery('')).toThrowError('Blog id is required');
    });
  });

  describe('ListPostQueryHandler', () => {
    const mockList = vi.fn();
    const subject = new ListPostQueryHandler({
      list: mockList,
    } as any);
    describe('execute', () => {
      it('should return empty list when repository return empty', async () => {
        mockList.mockResolvedValue([]);
        const posts = await subject.execute(new ListPostQuery('test-blog-id'));
        expect(posts).toEqual([]);
      });
      it('should return posts', async () => {
        mockList.mockResolvedValue([{ id: 'test', content: 'test-content' }]);
        const posts = await subject.execute(new ListPostQuery('test-blog-id'));
        expect(posts).toEqual([{ id: 'test', content: 'test-content' }]);
      });
    });
  });
});
