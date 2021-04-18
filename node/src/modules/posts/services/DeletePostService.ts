import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';

@injectable()
class DeletePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError(locale.resources.posts.notFound, 404);
    }

    await this.postsRepository.delete(post.id);
  }
}

export default DeletePostService;
