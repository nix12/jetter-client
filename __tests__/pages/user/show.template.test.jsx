import React from 'react';
import { shallow } from 'enzyme';

import Template from '../../../templates/user/show.template';

describe('<Show /> template', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      id: 1,
      username: 'test'
    };

    wrapper = shallow(<Template {...props} />);
  });

  it('should render Show component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call initialProps and output servside props', async () => {
    const isServer = true;
    const req = {
      userId: 1,
      username: 'test'
    };

    props = await Template.getInitialProps({ req, isServer });
    wrapper = shallow(<Template {...props} />);

    expect(props).toEqual({ userId: 1, username: 'test' });
  });
});
