import {
  CreatePostCommand,
  CreatePostCommandHandler,
} from './create-post.command';
import { PostCommandError } from './post.command.error';

describe('./create-post.command', () => {
  describe('CreatePostCommand', () => {
    it('should throw Error when id is not set ', () => {
      expect(() => new CreatePostCommand('', { content: '' })).toThrowError(
        'Blog id and content is required',
      );
    });
  });
  describe('CreatePostCommandHandler', () => {
    const mockIsExist = vi.fn();
    const mockSave = vi.fn();
    const subject = new CreatePostCommandHandler({
      isExist: mockIsExist,
      save: mockSave,
    } as any);

    it('should throw error when post already exists', async () => {
      mockIsExist.mockResolvedValue(true);
      await expect(
        subject.execute(
          new CreatePostCommand('test', { content: 'test-content' }),
        ),
      ).rejects.toBeInstanceOf(PostCommandError);
    });
    it('should call save into repository', async () => {
      mockIsExist.mockResolvedValue(false);
      await subject.execute(
        new CreatePostCommand('test', { content: 'test-content' }),
      );
      expect(mockSave).toBeCalled();
    });
  });
});
