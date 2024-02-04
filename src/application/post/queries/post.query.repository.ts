export type PostCommentValueObject = {
  id: number;
  author: string;
  content: string;
  createdAt: number;
};

export type PostValueObject = {
  id: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  comments: PostCommentValueObject[];
};

export type PostSummary = Omit<PostValueObject, 'comments' | 'updatedAt'>;

export interface PostQueryRepository {
  get(blogId: string, id: string): Promise<PostValueObject | null>;
  list(blogId: string): Promise<PostSummary[]>;
}
