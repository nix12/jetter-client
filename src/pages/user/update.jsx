import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Can from '../../components/Permissions/Can';
import { checkValidity, updateObject } from '../../shared/utility';
import { update } from '../../store/actions/index';

const updateUser = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);
  const error = useSelector(state => state.user.error);

  const [form, setForm] = useState({
    controls: {
      current_password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Current Password'
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
          placeholder: 'New Password'
        },
        value: '',
        validation: {
          required: true
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

    const cookies = new Cookies();
    const token = cookies.get('token');
    const data = jwtDecode(token);

    dispatch(
      update(
        data.username,
        form.controls.current_password.value,
        form.controls.password.value,
        form.controls.password_confirmation.value
      )
    ).then(() => {
      setForm(prevState => ({
        ...prevState,
        controls: {
          ...prevState.controls,
          current_password: {
            ...prevState.current_password,
            value: ''
          },
          password: {
            ...prevState.password,
            value: ''
          },
          password_confirmation: {
            ...prevState.password_confirmation,
            value: ''
          }
        }
      }));
    });
  };

  const formElementsArray = [];
  Object.keys(form.controls).map(key => {
    return formElementsArray.push({
      id: key,
      config: this.state.controls[key]
    });
  });

  let outputForm = formElementsArray.map(formElement => (
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
    outputForm = <CircularProgress />;
  }

  let errorMessage = null;

  if (error) {
    errorMessage = <p>{error}</p>;
  }

  return (
    <div>
      <h1>Update Password</h1>

      {errorMessage}

      <Can I="manage" this="User">
        <form onSubmit={submitHandler}>
          {outputForm}
          <Button>Submit</Button>
        </form>
      </Can>
    </div>
  );
};

export default updateUser;
