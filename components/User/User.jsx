import React from 'react';
import Can from '../Permission/Can';

const user = (props) => {
  return (
    <Can I='read' this='User'>
      <div>
        <h1>{ props.id }</h1>
        <h1>{ props.username }'s Page</h1>
      </div>
    </Can>
  )
}

export default user;
