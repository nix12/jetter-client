import React from 'react';
import { shallow } from 'enzyme';

import Template from '../../../templates/user/update.template';

describe('<Update /> template', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      onUpdate: jest.fn(),
      error: null
    };

    wrapper = shallow(<Template {...props} />);
  });

  it('should render Update component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call inputChangedHandler to update state', () => {
    const mockedEvent = { target: { value: 'abc' } };

    wrapper.instance().inputChangedHandler(mockedEvent, 'password');
    expect(wrapper.state().controls.password.value).toEqual('abc');
  });

  it('should call submitHandler to register and direct new users', () => {
    const mockEvent = { preventDefault: jest.fn() };

    return wrapper
      .instance()
      .submitHandler(mockEvent)
      .then(() => {
        expect(props.onUpdate).toBeCalled();
      });
  });

  it('should render with no error', () => {
    expect(props.error).toEqual(null);
  });

  it('should render with error', () => {
    const mockEvent = { preventDefault: jest.fn() };

    props = {
      onUpdate: jest.fn(),
      error: 'Password update failed.'
    };

    wrapper = shallow(<Template {...props} />);

    return wrapper
      .instance()
      .submitHandler(mockEvent)
      .then(() => {
        expect(props.error).toEqual('Password update failed.');
        expect(wrapper.find('p').html()).toEqual(
          '<p>Password update failed.</p>'
        );
      });
  });
});
