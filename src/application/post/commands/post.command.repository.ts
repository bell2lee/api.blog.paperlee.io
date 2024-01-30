import { Post } from '../../../domain/post/post';

export interface PostCommandRepository {
  get(id: string): Promise<Post>;
  isExist(id: string): Promise<boolean>;
  save(post: Post): Promise<void>;
}
