import React from 'react';

import User from '../../components/User/User';

const template = props => {
  const { userId, username } = props;

  return (
    <div>
      <h1>My Profile</h1>

      <User id={userId} username={username} />
    </div>
  );
};

export default template;
