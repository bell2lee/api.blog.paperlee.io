import {
  CreatePostCommand,
  CreatePostCommandHandler,
} from './create-post.command';
import { PostCommandError } from './post.command.error';
import { Post } from '../../../domain/post/post';

describe('./create-post.command', () => {
  describe('CreatePostCommand', () => {
    it('should throw Error when id is not set ', () => {
      expect(() => new CreatePostCommand('', 'content')).toThrowError(
        'Post id is required',
      );
    });
  });
  describe('CreatePostCommandHandler', () => {
    const mockIsExist = jest.fn();
    const mockSave = jest.fn();
    const subject = new CreatePostCommandHandler({
      isExist: mockIsExist,
      save: mockSave,
    } as any);

    it('should throw error when post already exists', async () => {
      mockIsExist.mockResolvedValue(true);
      await expect(
        subject.execute(new CreatePostCommand('test', 'test-content')),
      ).rejects.toBeInstanceOf(PostCommandError);
    });
    it('should call save into repository', async () => {
      mockIsExist.mockResolvedValue(false);
      await subject.execute(new CreatePostCommand('test', 'test-content'));
      expect(mockSave).toBeCalledWith(
        new Post({ id: 'test', content: 'test-content', comments: [] }),
      );
    });
  });
});
