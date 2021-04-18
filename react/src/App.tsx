import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './Imports';

import './assets/layout/css/sb-admin-2.css';

import './assets/vendor/jquery/jquery.js';
import './assets/vendor/bootstrap/js/bootstrap.js';
import './assets/vendor/jquery-easing/jquery.easing.js';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import Routes from './router';

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyle />
    </Router>
  );
};

export default App;
