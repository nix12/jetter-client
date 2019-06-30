import React from 'react';
import { shallow } from 'enzyme';
import Template from '../../templates/Layout/Layout.template';

describe('Template', () => {
  it('should render Template component', () => {
    const props = {
      onTryAutoSignup: jest.fn()
    };

    expect(shallow(<Template {...props} />)).toMatchSnapshot();
  });
});
