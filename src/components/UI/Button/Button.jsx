/* eslint-disable react/button-has-type */
import React from 'react';

const button = props => {
  const { children, clicked, disabled, type } = props;

  return (
    <button onClick={clicked} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

export default button;
