/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCogs,
  faList,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { useAuthk, User } from '../../../hooks/authk';

import profileImg from '../../../assets/img/undraw_profile.svg';

import { Container } from './styles';

const UserMenu: React.FC = () => {
  const { userInfo, signOut } = useAuthk();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUserInfo() {
      setUser(await userInfo());
    }

    loadUserInfo();
    return () => {
      setUser(null);
    };
  }, [userInfo]);

  const handleSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  return (
    <>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="userDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
          {user?.name}
        </span>
        <img
          className="img-profile rounded-circle"
          src={profileImg}
          alt="Profile"
        />
      </a>

      <div
        className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
        aria-labelledby="userDropdown"
      >
        <a className="dropdown-item" href="#">
          <FontAwesomeIcon
            icon={faUser}
            size="sm"
            className="mr-2 text-gray-400"
            fixedWidth
          />
          Profile
        </a>
        <a className="dropdown-item" href="#">
          <FontAwesomeIcon
            icon={faCogs}
            size="sm"
            className="mr-2 text-gray-400"
            fixedWidth
          />
          Settings
        </a>
        <a className="dropdown-item" href="#">
          <FontAwesomeIcon
            icon={faList}
            size="sm"
            className="mr-2 text-gray-400"
            fixedWidth
          />
          Activity Log
        </a>
        <div className="dropdown-divider" />
        <a
          href="#"
          className="dropdown-item"
          data-toggle="modal"
          onClick={handleSignOut}
        >
          <FontAwesomeIcon
            icon={faSignOutAlt}
            size="sm"
            className="mr-2 text-gray-400"
            fixedWidth
          />
          Logout
        </a>
      </div>
    </>
  );
};

export default UserMenu;
