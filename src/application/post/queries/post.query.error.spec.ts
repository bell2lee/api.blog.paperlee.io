import { PostQueryError } from './post.query.error';

describe('./post.query.error', () => {
  describe('PostQueryError', () => {
    it('should has message', () => {
      expect(new PostQueryError('message').message).toEqual('message');
    });
    it('should has error name', () => {
      const error = new PostQueryError('message');
      expect(error.name).toEqual('PostQueryError');
    });
  });
});
