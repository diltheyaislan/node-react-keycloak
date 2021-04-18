import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useAuthk } from '../../hooks/authk';

import Main from '../../components/layout/main';

import api from '../../services/api';

interface IPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    api.get(`/posts`).then(response => {
      setPosts(response.data);
    });
  }, []);

  const isAdmin = useAuthk().hasRole('app-admin');

  return (
    <Main pageTitle="Posts">
      <div>
        {isAdmin && (
          <div className=" mb-4">
            <Link to="/posts/create" className="btn btn-primary btn-icon-split">
              <span className="icon text-white-50">
                <FontAwesomeIcon icon={faPlus} size="1x" fixedWidth />
              </span>
              <span className="text">New post</span>
            </Link>
          </div>
        )}

        {!posts && <p>No posts created</p>}

        {posts && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col" style={{ width: '400px' }}>
                  ID
                </th>
                <th scope="col">Title</th>
                <th scope="col" style={{ width: '400px' }}>
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {posts &&
                posts.map(post => (
                  <tr key={post.id}>
                    <th scope="row">
                      <Link to={`/posts/${post.id}`}>{post.id}</Link>
                    </th>
                    <td>{post.title}</td>
                    <td>{post.created_at}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </Main>
  );
};

export default Posts;
