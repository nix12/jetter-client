import React from 'react';
import { shallow } from 'enzyme';

import Template from '../../../templates/user/new.template';

describe('<New /> template', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      onRegister: jest.fn(),
      router: {
        push: jest.fn()
      },
      error: null
    };

    wrapper = shallow(<Template {...props} />);
  });

  it('should render New component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call inputChangedHandler to update state', () => {
    const mockedEvent = { target: { value: 'abc' } };

    wrapper.instance().inputChangedHandler(mockedEvent, 'username');
    expect(wrapper.state().controls.username.value).toEqual('abc');
  });

  it('should call submitHandler to register and direct new users', () => {
    const mockEvent = { preventDefault: jest.fn() };

    return wrapper
      .instance()
      .submitHandler(mockEvent)
      .then(() => {
        expect(props.onRegister).toBeCalled();
        expect(props.router.push).toBeCalled();
      });
  });

  it('should render with no error', () => {
    expect(props.error).toEqual(null);
  });

  it('should render with error', () => {
    const mockEvent = { preventDefault: jest.fn() };

    props = {
      onRegister: jest.fn(),
      router: {
        push: jest.fn()
      },
      error: {
        username: 'error in username'
      }
    };

    wrapper = shallow(<Template {...props} />);

    return wrapper
      .instance()
      .submitHandler(mockEvent)
      .then(() => {
        expect(props.error).toEqual({
          username: 'error in username'
        });
        expect(wrapper.find('p').html()).toEqual(
          '<p>Username error in username.</p>'
        );
      });
  });
});
