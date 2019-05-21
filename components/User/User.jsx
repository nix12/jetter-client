import React from 'react';

const user = (props) => {
  return (
    <div>
      <h1>{ props.id }</h1>
      <h1>{ props.username }'s Page</h1>
    </div>
  )
}

export default user;