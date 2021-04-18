import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { useAuthk } from '../../../hooks/authk';

import Main from '../../../components/layout/main';

import api from '../../../services/api';

interface IPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const ShowPost: React.FC = () => {
  const routeParams = useParams<{ id: string }>();

  const history = useHistory();

  const [post, setPost] = useState<IPost | null>(null);

  const deletePostHandle = useCallback(() => {
    api.delete(`/posts/${routeParams.id}`).then(response => {
      history.push('/posts');
    });
  }, [routeParams, history]);

  useEffect(() => {
    api.get(`/posts/${routeParams.id}`).then(response => {
      setPost(response.data);
    });
  }, [routeParams]);

  const isAdmin = useAuthk().hasRole('app-admin');

  return (
    <Main pageTitle="Show post">
      {isAdmin && (
        <div className=" mb-4">
          <button
            onClick={deletePostHandle}
            type="button"
            className="btn btn-danger btn-icon-split"
          >
            <span className="icon text-white-50">
              <FontAwesomeIcon icon={faTrash} size="1x" fixedWidth />
            </span>
            <span className="text">Delete post</span>
          </button>
        </div>
      )}

      {post && (
        <div>
          <h3 className="mb-3">{post.title}</h3>
          <p>{post.content}</p>
        </div>
      )}
    </Main>
  );
};

export default ShowPost;
