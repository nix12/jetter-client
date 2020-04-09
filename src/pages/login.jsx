import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';
import { ability } from '../services/casl/ability';
import { updateObject, checkValidity } from '../shared/utility';
import { auth } from '../store/actions/index';

const Login = () => {
  const [form, setForm] = useState({
    controls: {
      username: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Username'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 15
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 8
        },
        valid: false,
        touched: false
      }
    }
  });

  const dispatch = useDispatch();

  const username = useSelector(state => state.auth.currentUser.username);
  const userId = useSelector(state => state.auth.currentUser.userId);
  const roles = useSelector(state => state.auth.currentUser.roles);
  const error = useSelector(state => state.auth.error);
  const loading = useSelector(state => state.auth.loading);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(form.controls, {
      [controlName]: updateObject(form.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          form.controls[controlName].validation
        ),
        touched: true
      })
    });

    setForm({ controls: updatedControls });
  };

  const submitHandler = event => {
    event.preventDefault();
    dispatch(auth(form.controls.username.value, form.controls.password.value));
  };

  const formElementsArray = [];
  Object.keys(form.controls).map(key => {
    return formElementsArray.push({
      id: key,
      config: form.controls[key]
    });
  });

  let formOutput = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (loading) {
    formOutput = <CircularProgress />;
  }

  let errorMessage = null;
  if (error) {
    errorMessage = <h5 style={{ color: 'red' }}>{error}</h5>;
  }

  const rolesList = roles
    ? roles.map((role, index) => (
        <span key={index} style={{ display: 'block' }}>
          role {role}
        </span>
      ))
    : null;

  const abilities = ability.rules.map((rule, index) => (
    <span key={index} style={{ display: 'block' }}>
      rules [{rule.actions}: {rule.subject}]
    </span>
  ));

  return (
    <div>
      <h2>Login</h2>
      <div>
        {errorMessage}
        <form onSubmit={submitHandler}>
          {formOutput}
          <Button type="submit">Submit</Button>
        </form>
      </div>
      <div>
        <span style={{ display: 'block' }}>ID: {userId}</span>
        <span style={{ display: 'block' }}>Username: {username}</span>
        <span style={{ display: 'block' }}>{rolesList}</span>
        {abilities}
      </div>
    </div>
  );
};

export default Login;
