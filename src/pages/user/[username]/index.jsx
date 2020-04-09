import React from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

import Can from '../../../components/Permissions/Can';
import redirectTo from '../../../shared/redirectTo';

const User = () => {
  const user = useSelector(state => state.auth.currentUser);

  return (
    <div>
      <h1>My Profile</h1>

      <Can I="read" this={{ __type: 'User', id: user.userId }}>
        <h1>{user.userId}</h1>
        <h1>{`${user.username}'s Page`}</h1>
      </Can>
    </div>
  );
};

User.getInitialProps = async ({ res }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  if (!token) {
    redirectTo('/login', { res, status: 301 });
  }

  return {};
};

export default User;
