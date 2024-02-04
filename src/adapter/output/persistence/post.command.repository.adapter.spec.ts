import { PostCommandRepositoryAdapter } from './post.command.repository.adapter';

describe('./post.command.repository.adapter', () => {
  const mockFindFirst = vi.fn();
  const subject = new PostCommandRepositoryAdapter(
    {
      postEvent: {
        findFirst: mockFindFirst,
      },
    } as any,
    {
      listEvents: vi.fn(),
    } as any,
  );
  describe('get', () => {
    it('should return a Post', async () => {});
  });
  describe('isExist', () => {
    it('should return true when prisma is return true', async () => {
      mockFindFirst.mockResolvedValue(true);
      const result = await subject.isExist('test-blog-id', 'test');
      expect(result).toEqual(true);
    });
    it('should return false when prisma is return false', async () => {
      mockFindFirst.mockResolvedValue(false);
      const result = await subject.isExist('test-blog-id', 'test');
      expect(result).toEqual(false);
    });
    it('should call with blogId and postId', () => {
      subject.isExist('test-blog-id', 'test');
      expect(mockFindFirst).toBeCalledWith({
        where: { blogId: 'test-blog-id', postId: 'test' },
      });
    });
  });
});
