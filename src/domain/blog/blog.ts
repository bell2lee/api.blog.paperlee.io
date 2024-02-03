export class Blog {
  constructor(
    private readonly _data: {
      blogId: string;
      name: string;
      description?: string;
    },
  ) {
    if (!_data.blogId.trim() || !_data.name.trim()) {
      throw new Error('BlogId and name must not be empty');
    }
  }

  static newBlog({
    blogId,
    name = `${blogId}.blog.paperlee.io`,
    description,
  }: {
    blogId: string;
    name?: string;
    description?: string;
  }): Blog {
    const blog = new Blog({ blogId, name, description });
    return blog;
  }

  get blogUrl() {
    return `${this._data.blogId}.blog.paperlee.io`;
  }
}
