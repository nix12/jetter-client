import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../components/UI/Input/Input';

describe('input', () => {
  it('should render input component', () => {
    expect(shallow(<Input />)).toMatchSnapshot();
  });
});
