import React from 'react';
import Can from '../Permission/Can';

const user = props => {
  const { id, username } = props;

  return (
    <Can I="read" this="User">
      <h1>{id}</h1>
      <h1>{`${username}'s Page`}</h1>
    </Can>
  );
};

export default user;
