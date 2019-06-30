import React from 'react';
import { shallow } from 'enzyme';
import Template from '../../../templates/auth/logout.template';

describe('<Logout /> template', () => {
  it('should render Logout component', () => {
    const props = {
      onLogout: jest.fn()
    };
    const wrapper = shallow(<Template {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should logout and redirect', () => {
    jest.useFakeTimers();

    const props = {
      onLogout: jest.fn(),
      router: {
        push: jest.fn()
      }
    };

    const wrapper = shallow(<Template {...props} />);
    const instance = wrapper.instance();
    instance.componentDidMount();

    expect(setTimeout).toHaveBeenCalledTimes(2);

    jest.runAllTimers();
    expect(instance.props.onLogout).toBeCalled();
  });
});
