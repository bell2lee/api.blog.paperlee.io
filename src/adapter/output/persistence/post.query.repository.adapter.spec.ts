import { PostQueryRepositoryAdapter } from './post.query.repository.adapter';
import { PostCreatedEvent } from '../../../domain/post/events/post-created.event';

describe('./post.query.repository.adapter', () => {
  const mockListEvents = vi.fn();
  const mockListCreatedPostEvents = vi.fn();
  const subject = new PostQueryRepositoryAdapter({
    listEvents: mockListEvents,
    listCreatedPostEvents: mockListCreatedPostEvents,
  } as any);
  describe('get', () => {
    it('should return a post', async () => {
      mockListEvents.mockResolvedValue([
        new PostCreatedEvent(
          `posts/1/created`,
          { blogId: 'test-blog-id', id: '1', content: 'test' },
          { publishedAt: 1706967718000, publishedBy: 'paper' },
        ),
      ]);
      const post = await subject.get('test-blog-id', '1');
      expect(post).toEqual({
        id: '1',
        createdAt: 1706967718000,
        content: 'test',
        comments: [],
      });
    });

    it('should return null when has not post', async () => {
      mockListEvents.mockResolvedValue([]);
      const post = await subject.get('test-blog-id', '1');
      expect(post).toBeNull();
    });
  });
  describe('list', () => {
    it('should return a list of posts', async () => {
      mockListCreatedPostEvents.mockResolvedValue([
        new PostCreatedEvent(
          `posts/1/created`,
          { blogId: 'test-blog-id', id: '1', content: 'test' },
          { publishedAt: 1706967718000, publishedBy: 'paper' },
        ),
      ]);
      const posts = await subject.list('test-blog-id');
      expect(posts).toEqual([
        {
          id: '1',
          createdAt: 1706967718000,
          content: 'test',
        },
      ]);
    });

    it('should call event repository with blogId', async () => {
      mockListCreatedPostEvents.mockResolvedValue([]);
      await subject.list('test-blog-id');
      expect(mockListCreatedPostEvents).toHaveBeenCalledWith('test-blog-id');
    });

    it('should return empty list', async () => {
      mockListCreatedPostEvents.mockResolvedValue([]);
      const posts = await subject.list('test-blog-id');
      expect(posts).toEqual([]);
    });
  });
});
