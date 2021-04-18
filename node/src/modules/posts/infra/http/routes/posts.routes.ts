import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PostsController from '@modules/posts/infra/http/controllers/PostsController';

import Keycloak from '@shared/infra/keycloak';

const postsRouter = Router();
const postsController = new PostsController();

postsRouter.use(Keycloak.getInstance().protect('realm:app-user'));

postsRouter.get('/', postsController.index);

postsRouter.get('/:id', postsController.show);

postsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      content: Joi.string().required(),
    },
  }),
  postsController.create,
);

postsRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      content: Joi.string().required(),
    },
  }),
  postsController.update,
);

postsRouter.delete('/:id', postsController.delete);

export default postsRouter;
