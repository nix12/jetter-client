import React from 'react';
import { useSelector } from 'react-redux';

import Can from '../../components/Permissions/Can';

const show = () => {
  const username = useSelector(state => state.auth.currentUser.username);
  const userId = useSelector(state => state.auth.currentUser.userId);

  return (
    <div>
      <h1>My Profile</h1>

      {/* <Can I="read" this="User"> */}
      <h1>{userId}</h1>
      <h1>{`${username}'s Page`}</h1>
      {/* </Can> */}
    </div>
  );
};

export default show;
