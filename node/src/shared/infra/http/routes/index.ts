import { Router } from 'express';

import postsRouter from '@modules/posts/infra/http/routes/posts.routes';

const routes = Router();

routes.use('/posts', postsRouter);

routes.get('/valid', (_request, response) => {
  return response.json({ valid: true });
});

export default routes;
