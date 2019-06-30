import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../components/UI/Button/Button';

describe('button', () => {
  it('should render button component', () => {
    expect(shallow(<Button />)).toMatchSnapshot();
  });
});
