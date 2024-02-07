import { PostEventRepository } from './post-event.repository';
import { PostCreatedEvent } from '../../../domain/post/events/post-created.event';

describe('./post-event.repository', () => {
  const mockCreateMany = vi.fn();
  const mockFindMany = vi.fn();
  const subject = new PostEventRepository({
    postEvent: {
      createMany: mockCreateMany,
      findMany: mockFindMany,
      findUnique: vi.fn(),
    },
  } as any);
  describe('PostEventRepository', () => {
    describe('save', () => {
      it('should save with events', async () => {
        await subject.save([
          new PostCreatedEvent(
            'posts/test/created',
            { blogId: 'test-blog-id', id: 'test', content: 'test' },
            { publishedAt: 0, publishedBy: 'paper' },
          ),
        ]);
        expect(mockCreateMany).toHaveBeenCalledWith({
          data: [
            {
              blogId: 'test-blog-id',
              postId: 'test',
              type: 'CREATED_POST',
              message: { blogId: 'test-blog-id', id: 'test', content: 'test' },
              meta: { publishedAt: 0, publishedBy: 'paper' },
            },
          ],
          skipDuplicates: false,
        });
      });
    });
    describe('listCreatedPostEvents', () => {
      it('should return empty array', async () => {
        mockFindMany.mockResolvedValue([]);
        const events = await subject.listCreatedPostEvents('test-blog-id');
        expect(events).toEqual([]);
      });
      it('should return array', async () => {
        mockFindMany.mockResolvedValue([
          {
            blogId: 'test-blog-id',
            postId: 'test',
            type: 'CREATED_POST',
            message: { blogId: 'test-blog-id', id: 'test', content: 'test' },
            meta: { publishedAt: 0, publishedBy: 'paper' },
          },
        ]);
        const events = await subject.listCreatedPostEvents('test-blog-id');
        expect(events).toEqual([
          new PostCreatedEvent(
            'posts/test/created',
            { blogId: 'test-blog-id', id: 'test', content: 'test' },
            { publishedAt: 0, publishedBy: 'paper' },
          ),
        ]);
      });
      it('should call findMany with CREATED_POST only condition', async () => {
        mockFindMany.mockResolvedValue([]);
        await subject.listCreatedPostEvents('test-blog-id');
        expect(mockFindMany).toHaveBeenCalledWith({
          where: { blogId: 'test-blog-id', type: 'CREATED_POST' },
          orderBy: expect.any(Object),
        });
      });
    });
    describe('listEvents', () => {
      it('should return created domain event from database event sources', async () => {
        const now = new Date();
        mockFindMany.mockResolvedValue([
          {
            blogId: 'test-blog-id',
            postId: 'test',
            type: 'CREATED_POST',
            message: { blogId: 'test-blog-id', id: 'test', content: 'test' },
            meta: { publishedAt: now.getTime(), publishedBy: 'paper' },
          },
        ]);
        const events = await subject.listEvents('test-blog-id', 'test');
        expect(events).toEqual([
          new PostCreatedEvent(
            'posts/test/created',
            { blogId: 'test-blog-id', id: 'test', content: 'test' },
            { publishedAt: now.getTime(), publishedBy: 'paper' },
          ),
        ]);
      });
      it('should call findMany with conditions (blogId, postId)', () => {
        subject.listEvents('test-blog-id', 'test');
        expect(mockFindMany).toHaveBeenCalledWith({
          where: { blogId: 'test-blog-id', postId: 'test' },
          orderBy: expect.any(Object),
        });
      });
      it('should call findMany with order by id condition', () => {
        subject.listEvents('test-blog-id', 'test');
        expect(mockFindMany).toHaveBeenCalledWith({
          where: expect.any(Object),
          orderBy: {
            id: 'asc',
          },
        });
      });
    });
  });
});
