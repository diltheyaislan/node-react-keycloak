import { getRepository, Repository } from 'typeorm';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';

import Post from '@modules/posts/infra/typeorm/entities/Post';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async find(): Promise<Post[]> {
    const posts = await this.ormRepository.find({
      order: { title: 'ASC' },
    });
    return posts;
  }

  public async findById(id: string): Promise<Post | undefined> {
    const post = await this.ormRepository.findOne(id);
    return post;
  }

  public async create(
    postData: ICreatePostDTO,
  ): Promise<Post> {
    const post = this.ormRepository.create(postData);
    await this.ormRepository.save(post);

    return post;
  }

  public async save(post: Post): Promise<Post> {
    return this.ormRepository.save(post);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default PostsRepository;
