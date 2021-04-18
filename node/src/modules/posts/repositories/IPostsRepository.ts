import Post from '@modules/posts/infra/typeorm/entities/Post';
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';

export default interface IPostsRepository {
  find(): Promise<Post[]>;
  findById(id: string): Promise<Post | undefined>;
  create(data: ICreatePostDTO): Promise<Post>;
  save(Post: Post): Promise<Post>;
  delete(id: string): Promise<void>;
}
