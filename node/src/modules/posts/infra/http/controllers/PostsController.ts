import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePostService from '@modules/posts/services/CreatePostService';
import ListPostService from '@modules/posts/services/ListPostsService';
import ShowPostService from '@modules/posts/services/ShowPostService';
import UpdatePostService from '@modules/posts/services/UpdatePostService';
import DeletePostService from '@modules/posts/services/DeletePostService';

export default class PostsController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listPosts = container.resolve(ListPostService);

    const posts = await listPosts.execute();

    return response.json(classToClass(posts));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPost = container.resolve(ShowPostService);

    const post = await showPost.execute(id);

    return response.json(classToClass(post));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, content } = request.body;

    const createPost = container.resolve(CreatePostService);

    const post = await createPost.execute({
      title,
      content,
    });

    return response.json(classToClass(post));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { title, content } = request.body;

    const udpatePost = container.resolve(UpdatePostService);

    const post = await udpatePost.execute({
      id,
      title,
      content
    });

    return response.json(classToClass(post));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePost = container.resolve(DeletePostService);

    await deletePost.execute(id);

    return response.status(204).send();
  }
}
