import React from 'react';

const input = props => {
  const { elementConfig, elementType, value, name, changed } = props;
  let inputElement = null;

  switch (elementType) {
    case 'input':
      inputElement = (
        <input
          {...elementConfig}
          value={value}
          onChange={changed}
          name={name}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea {...elementConfig} value={value} onChange={changed} />
      );
      break;
    default:
      inputElement = (
        <input {...elementConfig} value={value} onChange={changed} />
      );
  }

  return <div>{inputElement}</div>;
};

export default input;
