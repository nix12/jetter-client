import React from 'react';
import { shallow } from 'enzyme';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

describe('toolbar', () => {
  it('should render toolbar component', () => {
    expect(shallow(<Toolbar />)).toMatchSnapshot();
  });
});
