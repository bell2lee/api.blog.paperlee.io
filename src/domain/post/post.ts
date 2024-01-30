import { CommentAddedEvent } from './events/comment-added.event';
import { BaseAggregateRoot } from '../base-aggregate-root';
import { PostComment } from './post-comment';

export class Post extends BaseAggregateRoot<`posts/${string}`, any> {
  constructor(
    private _data: {
      readonly id: string;
      readonly content?: string;
      comments: PostComment[];
    },
  ) {
    super();
  }
  get id() {
    return this._data.id;
  }
  get comments() {
    return this._data.comments;
  }

  addComment(comment: PostComment) {
    this._data.comments.push(comment);
    this.addEvent(
      new CommentAddedEvent(`posts/${this._data.id}/added-comment`, comment),
    );
  }
}
