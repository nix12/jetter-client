import React from 'react';
import { shallow } from 'enzyme';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';

describe('navigationItem', () => {
  it('should render navigationItems component', () => {
    expect(shallow(<NavigationItems />)).toMatchSnapshot();
  });
});
