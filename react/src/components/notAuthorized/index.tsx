import React from 'react';

import Main from '../layout/main';

const NotAuthorized: React.FC = () => {
  return (
    <Main pageTitle="Access Denied">
      <div>
        <p>
          This is a secured component of your application. You should not be
          able to see this unless you have authenticated with Keycloak.
        </p>
      </div>
    </Main>
  );
};

export default NotAuthorized;
