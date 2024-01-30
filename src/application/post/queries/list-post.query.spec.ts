import { ListPostQueryHandler } from './list-post.query';

describe('./list-post.query', () => {
  describe('ListPostQueryHandler', () => {
    const mockList = jest.fn();
    const subject = new ListPostQueryHandler({
      list: mockList,
    } as any);
    describe('execute', () => {
      it('should return empty list when repository return empty', async () => {
        mockList.mockResolvedValue([]);
        const posts = await subject.execute();
        expect(posts).toEqual([]);
      });
      it('should return posts', async () => {
        mockList.mockResolvedValue([{ id: 'test', content: 'test-content' }]);
        const posts = await subject.execute();
        expect(posts).toEqual([{ id: 'test', content: 'test-content' }]);
      });
    });
  });
});
