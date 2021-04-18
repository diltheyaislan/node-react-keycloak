import { container } from 'tsyringe';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import PostsRepository from '@modules/posts/infra/typeorm/repositories/PostsRepository';

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository,
);
