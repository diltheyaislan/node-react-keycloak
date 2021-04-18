import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';

import Post from '@modules/posts/infra/typeorm/entities/Post';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';

interface IRequest {
  id: string;
  title: string;
  content: string;
}

@injectable()
class UpdatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ id, title, content }: IRequest): Promise<Post> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError(locale.resources.posts.notFound, 404);
    }

    post.title = title;
    post.content = content;

    return this.postsRepository.save(post);
  }
}

export default UpdatePostService;
