/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import Sidenav from '../sidenav';
import Header from '../header';

import { Container } from './styles';

type MainPageProps = {
  pageTitle?: string;
};

const Main: React.FC<MainPageProps> = ({ children, pageTitle }) => (
  <div id="wrapper">
    <Sidenav />

    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <Header />

        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">{pageTitle}</h1>
          </div>

          {children}
        </div>
      </div>
    </div>
  </div>
);

export default Main;
