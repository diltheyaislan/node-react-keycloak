import { injectable, inject } from 'tsyringe';

import Post from '@modules/posts/infra/typeorm/entities/Post';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';

interface IRequest {
  title: string;
  content: string;
}

@injectable()
class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ title, content }: IRequest): Promise<Post> {
        const post = await this.postsRepository.create({
      title,
      content,
    });

    return post;
  }
}

export default CreatePostService;
