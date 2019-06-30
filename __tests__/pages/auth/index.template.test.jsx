import React from 'react';
import { shallow } from 'enzyme';
import Template from '../../../templates/auth/index.template';

describe('auth page', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      onAuth: jest.fn(),
      error: null
    }

    wrapper = shallow(<Template { ...props } />)
  });
  
  it('should render auth page', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call inputChangedHandler to update state', () => {
    const mockedEvent = { target: { value: 'abc' } };

    wrapper.instance().inputChangedHandler(mockedEvent, 'username');
    expect(wrapper.state().controls.username.value).toEqual('abc');
  });

  it('should call submitHandler to register and direct new users', () => {
    const mockEvent = { preventDefault: jest.fn() }
    
    return wrapper.instance().submitHandler(mockEvent)
      .then(() => {
        expect(props.onAuth).toBeCalled();
      }) 
  });

  it('should render with no error', () => {
    expect(props.error).toEqual(null);
  });

  it('should render with error', () => {
    const mockEvent = { preventDefault: jest.fn() }

    props = {
      onAuth: jest.fn(),
      error: 'Invalid username or password.'
    }

    wrapper = shallow(<Template { ...props } />);
    
    return wrapper.instance().submitHandler(mockEvent)
      .then(() => {
        expect(props.error).toEqual('Invalid username or password.');
        expect(wrapper.find('p').html()).toEqual('<p>Invalid username or password.</p>');
      })
  });
});