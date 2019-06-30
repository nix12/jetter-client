import React from 'react';
import { shallow } from 'enzyme';
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';

describe('navigationItem', () => {
  it('should render navigationItem component', () => {
    expect(shallow(<NavigationItem />)).toMatchSnapshot();
  });
});
