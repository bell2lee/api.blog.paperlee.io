import { CommentAddedEvent } from './events/comment-added.event';
import { PostComment } from './post-comment';
import { AggregateRoot } from '@nestjs/cqrs';
import { PostCreatedEvent } from './events/post-created.event';

type PostEventSource = CommentAddedEvent | PostCreatedEvent;

export class Post extends AggregateRoot {
  private _data: {
    id: string;
    content: string;
    comments: PostComment[];
  };
  constructor(postId: string, eventSources: PostEventSource[]) {
    super();
    this._data = {
      id: postId,
      content: '',
      comments: [],
    };
    for (const event of eventSources) {
      this.apply(event, true);
    }
  }

  static newPost(postId: string, content: string): Post {
    const post = new Post(postId, [
      new PostCreatedEvent(
        `posts/${postId}/created`,
        {
          id: postId,
          content,
        },
        { publishedAt: Date.now(), publishedBy: 'paper' },
      ),
    ]);
    return post;
  }

  private applyEventSource(event: PostEventSource, fromHistory?: boolean) {
    if (
      event.topic === 'posts/${this._data.id}/added-comment' &&
      event instanceof CommentAddedEvent
    ) {
      this._data.comments.push(
        new PostComment(event.message.author, event.message.content),
      );
    } else if (
      event.topic === `posts/${this._data.id}/created` &&
      event instanceof PostCreatedEvent
    ) {
      this._data.content = event.message.content;
    } else {
      throw new Error(`Unknown event source topic: ${event.topic}`);
    }

    super.apply(event, fromHistory);
  }
  get id() {
    return this._data.id;
  }
  get content() {
    return this._data.content;
  }
  get comments() {
    return this._data.comments;
  }

  addComment(comment: PostComment): this {
    this._data.comments.push(comment);
    this.applyEventSource(
      new CommentAddedEvent(`posts/${this._data.id}/added-comment`, comment),
    );
    return this;
  }
}
