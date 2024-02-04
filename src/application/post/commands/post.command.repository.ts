import { Post } from '../../../domain/post/post';

export interface PostCommandRepository {
  get(blogId: string, postId: string): Promise<Post>;
  isExist(blogId: string, postId: string): Promise<boolean>;
  save(post: Post): Promise<void>;
}
