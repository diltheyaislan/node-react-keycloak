/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import UserMenu from '../user-menu';

import { Container } from './styles';

const Header: React.FC = () => (
  <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    <button
      type="button"
      id="sidebarToggleTop"
      className="btn btn-link d-md-none rounded-circle mr-3"
    >
      <FontAwesomeIcon icon={faBars} size="sm" className="mr-1" fixedWidth />
    </button>

    <ul className="navbar-nav ml-auto">
      <div className="topbar-divider d-none d-sm-block" />

      <li className="nav-item dropdown no-arrow">
        <UserMenu />
      </li>
    </ul>
  </nav>
);

export default Header;
