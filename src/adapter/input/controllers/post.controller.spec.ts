import { beforeEach } from 'vitest';
import { PostController } from './post.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ListPostQuery } from '../../../application/post/queries/list-post.query';

describe('./post.controller', () => {
  const mockQueryBusExecute = vi.fn();
  const mockCommandBusExecute = vi.fn();
  let postController: PostController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: 'QueryBus',
          useValue: {
            execute: mockQueryBusExecute,
          },
        },
        {
          provide: 'CommandBus',
          useValue: {
            execute: mockCommandBusExecute,
          },
        },
      ],
    }).compile();
    mockQueryBusExecute.mockClear();
    mockCommandBusExecute.mockClear();
    postController = module.get(PostController);
  });
  describe('GET /blogs/:blogId/posts', () => {
    it('should return query result', async () => {
      mockQueryBusExecute.mockResolvedValue('test-result');
      const result = await postController.getPosts('test-blog-id');
      expect(result).toEqual('test-result');
    });
    it('should call ListPostQuery on queryBus with blogId', () => {
      postController.getPosts('test-blog-id');
      expect(mockQueryBusExecute).toBeCalledWith(
        new ListPostQuery('test-blog-id'),
      );
    });
  });
  describe('GET /blogs/:blogId/posts/:id', () => {});
  describe('POST /blogs/:blogId/posts', () => {});
});
