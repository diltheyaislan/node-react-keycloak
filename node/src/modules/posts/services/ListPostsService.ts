import { injectable, inject } from 'tsyringe';

import Post from '@modules/posts/infra/typeorm/entities/Post';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';

@injectable()
class ListPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(): Promise<Post[]> {
    const posts = await this.postsRepository.find();

    return posts;
  }
}

export default ListPostService;
