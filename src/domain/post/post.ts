import { PostCommentAddedEvent } from './events/post-comment-added.event';
import { PostComment } from './post-comment';
import { AggregateRoot } from '@nestjs/cqrs';
import { PostCreatedEvent } from './events/post-created.event';

export type PostEventSource = PostCommentAddedEvent | PostCreatedEvent;

export class Post extends AggregateRoot {
  private _data: {
    blogId: string;
    id: string;
    content: string;
    comments: PostComment[];
    createdAt?: Date;
    updatedAt?: Date;
  };
  constructor(
    { postId, blogId }: { postId: string; blogId: string },
    eventSources: PostEventSource[],
  ) {
    super();
    this._data = {
      blogId: blogId,
      id: postId,
      content: '',
      comments: [],
    };

    if (!this._data.blogId || !this._data.id) {
      throw new Error('Blog id and post id is required');
    }

    for (const event of eventSources) {
      this.applyEventSource(event, true);
    }
  }

  private static generateId(content: string) {
    return String(Math.floor(Math.random() * 1000));
  }

  static newPost({
    blogId,
    postId: id,
    content,
  }: {
    blogId: string;
    postId?: string;
    content: string;
  }): Post {
    const postId = id || this.generateId(content);
    const post = new Post({ postId, blogId }, []);
    post.applyEventSource(
      new PostCreatedEvent(
        `posts/${postId}/created`,
        {
          blogId: post._data.blogId,
          id: postId,
          content,
        },
        { publishedAt: Date.now(), publishedBy: 'paper' },
      ),
      false,
    );
    return post;
  }

  private applyEventSource(event: PostEventSource, fromHistory?: boolean) {
    if (
      event.topic === `posts/${this._data.id}/added-comment` &&
      event instanceof PostCommentAddedEvent
    ) {
      this._data.comments.push(
        new PostComment(
          event.message.id,
          event.message.author,
          event.message.content,
          new Date(event.meta.publishedAt),
        ),
      );
    } else if (
      event.topic === `posts/${this._data.id}/created` &&
      event instanceof PostCreatedEvent
    ) {
      this._data.content = event.message.content;
      this._data.createdAt = new Date(event.meta.publishedAt);
    } else {
      throw new Error(`Unknown event source topic: ${event.topic}`);
    }

    super.apply(event, { fromHistory, skipHandler: fromHistory });
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

  get createdAt() {
    return this._data.createdAt;
  }

  get updatedAt() {
    return this._data.updatedAt;
  }

  addComment(comment: PostComment): this {
    this.applyEventSource(
      new PostCommentAddedEvent(
        `posts/${this._data.id}/added-comment`,
        {
          blogId: this._data.blogId,
          postId: this._data.id,
          id: comment.id,
          author: comment.author,
          content: comment.content,
        },
        {
          publishedAt: Date.now(),
          publishedBy: comment.author,
        },
      ),
    );
    return this;
  }
}
