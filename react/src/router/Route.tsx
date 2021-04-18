import React, { useCallback, useEffect, useState } from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import Loading from '../components/loading';
import NotAuthorized from '../components/notAuthorized';

import { useAuthk } from '../hooks/authk';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user, isAuthenticated } = useAuthk();

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function validateAuth() {
      const auth = await isAuthenticated();
      setAuthenticated(auth);
      setLoading(false);
    }
    validateAuth();
  }, [isAuthenticated]);

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (!isPrivate) {
          return <Component />;
        }

        if (loading) {
          return <Loading />;
        }

        if (isPrivate && authenticated) {
          return <Component />;
        }

        return <NotAuthorized />;
      }}
    />
  );
};

export default Route;
