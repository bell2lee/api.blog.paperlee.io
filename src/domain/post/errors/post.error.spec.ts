import { PostError } from './post.error';

describe('./post.error', () => {
  it('should has message', () => {
    expect(new PostError('test', 0).message).toEqual('test');
  });
  it('should has error name', () => {
    expect(new PostError('test', 0).name).toEqual('PostError');
  });
});
