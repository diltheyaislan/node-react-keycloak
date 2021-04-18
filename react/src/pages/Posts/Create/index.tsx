import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Main from '../../../components/layout/main';

import api from '../../../services/api';

interface IPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const CreatePost: React.FC = () => {
  const titleInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<HTMLTextAreaElement>(null);

  const history = useHistory();

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      const title = titleInput.current?.value;
      const content = contentInput.current?.value;

      api
        .post(`/posts/`, {
          title,
          content,
        })
        .then(response => {
          history.push('/posts');
        });
    },
    [history],
  );

  return (
    <Main pageTitle="New post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            ref={titleInput}
            id="title"
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            ref={contentInput}
            id="content"
            className="form-control"
            rows={3}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary mb-2">
            Add
          </button>
        </div>
      </form>
    </Main>
  );
};

export default CreatePost;
