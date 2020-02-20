import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { updateObject, checkValidity } from '../../shared/utility';
import { register } from '../../store/actions/index';

const New = () => {
  const error = useSelector(state => state.register.error);
  const dispatch = useDispatch();
  const router = useRouter();

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
          required: true
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
          minLength: 6
        },
        valid: false,
        touched: false
      },
      password_confirmation: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password Confirmation'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  });

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

    dispatch(
      register(
        form.controls.username.value,
        form.controls.password.value,
        form.controls.password_confirmation.value
      )
    )
      .then(() => {
        if (!error) {
          router.push('/');
        }
      })
      .catch(err => {
        console.log('err on register submitHandler', err);
        console.log('props', this.props);
      });
  };

  const formElementsArray = [];
  Object.keys(form.controls).map(key => {
    return formElementsArray.push({
      id: key,
      config: form.controls[key]
    });
  });

  const outputForm = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
      name={formElement.id}
    />
  ));

  let errorMessage = null;

  if (error) {
    Object.entries(error).map(([key, value], i) => {
      const field = key.charAt(0).toUpperCase() + key.slice(1);

      errorMessage = (
        <p>
          <span>
            {field}
            {value}
          </span>
        </p>
      );
    });
  }

  return (
    <div>
      <h1>Sign Up</h1>

      <div>
        {errorMessage}
        <form onSubmit={submitHandler}>
          {outputForm}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default New;
