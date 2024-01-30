export type PostCommentValueObject = {
  author: string;
  content: string;
};

export type PostValueObject = {
  id: string;
  content: string;
  comments: PostCommentValueObject[];
};

export interface PostQueryRepository {
  get(id: string): Promise<PostValueObject | null>;
  list(): Promise<PostValueObject[]>;
}
