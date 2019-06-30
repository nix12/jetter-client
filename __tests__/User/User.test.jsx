import React from 'react';
import { shallow } from 'enzyme';
import User from '../../components/User/User';

describe('user', () => {
  it('should render user component', () => {
    expect(shallow(<User />)).toMatchSnapshot();
  });
});
