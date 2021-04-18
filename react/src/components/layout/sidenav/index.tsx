/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faLaughWink,
  faStar,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

import { Container } from './styles';

const Sidenav: React.FC = () => (
  <ul
    className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <Link
      to="/"
      className="sidebar-brand d-flex align-items-center justify-content-center"
    >
      <div className="sidebar-brand-icon rotate-n-15">
        <FontAwesomeIcon icon={faLaughWink} size="2x" />
      </div>
      <div className="sidebar-brand-text mx-3">React App</div>
    </Link>

    <hr className="sidebar-divider my-0" />

    <li className="nav-item active">
      <Link to="/" className="nav-link">
        <FontAwesomeIcon
          icon={faTachometerAlt}
          size="sm"
          className="mr-1"
          fixedWidth
        />
        <span>Dashboard</span>
      </Link>
    </li>

    <hr className="sidebar-divider" />

    <div className="sidebar-heading">Interface</div>

    <li className="nav-item">
      <a
        className="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseTwo"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <FontAwesomeIcon icon={faCog} size="sm" className="mr-1" fixedWidth />
        <span>Resources</span>
      </a>
      <div
        id="collapseTwo"
        className="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">
            <FontAwesomeIcon
              icon={faStar}
              size="sm"
              className="mr-1"
              fixedWidth
            />
            Favorites
          </h6>
          <Link to="/posts" className="collapse-item">
            Posts
          </Link>
        </div>
      </div>
    </li>
  </ul>
);

export default Sidenav;
