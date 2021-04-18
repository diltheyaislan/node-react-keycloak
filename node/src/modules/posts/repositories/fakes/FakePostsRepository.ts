import { uuid } from 'uuidv4';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';

import Post from '@modules/posts/infra/typeorm/entities/Post';

class FakePostsRepository implements IPostsRepository {
  private posts: Post[] = [];

  public async findById(id: string): Promise<Post | undefined> {
    const foundPost = this.posts.find(
      post => post.id === id,
    );
    return foundPost;
  }

  public async create(
    postData: ICreatePostDTO,
  ): Promise<Post> {
    const post = new Post();

    Object.assign(post, { id: uuid() }, postData);

    this.posts.push(post);

    return post;
  }

  public async save(post: Post): Promise<Post> {
    const postIndex = this.posts.findIndex(
      findPost => findPost.id === post.id,
    );

    this.posts[postIndex] = post;

    return post;
  }

  public async delete(id: string): Promise<void> {
    const postIndex = this.posts.findIndex(
      findPost => findPost.id === id,
    );

    this.posts.splice(postIndex, 1);
  }

  public async find(): Promise<Post[]> {
    const { posts } = this;

    return posts;
  }
}

export default FakePostsRepository;
