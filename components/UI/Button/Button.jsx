import React from 'react';

const button = (props) => {
  return (
    <button
      onClick={ props.clicked }
      disabled={ props.disabled }
    >
      { props.children }
    </button>
  )
}

export default button;
