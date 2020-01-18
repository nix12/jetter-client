import React, { useState } from 'react';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../shared/utility';

const newJet = props => {
  const [form, setForm] = useState({
    controls: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      description: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Description'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3
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
    const { onRegister, router } = props;

    onRegister(
      form.controls.username.value,
      form.controls.password.value,
      form.controls.password_confirmation.value
    )
      .then(() => {
        if (!this.props.error) {
          router.push('/login');
        }
      })
      .catch(err => {
        console.log('err on register submitHandler', err);
        console.log('props', this.props);
      });
  };

  const { error } = props;

  const formElementsArray = [];
  for (let key in form.controls) {
    formElementsArray.push({
      id: key,
      config: form.controls[key]
    });
  }

  const formOutput = formElementsArray.map(formElement => (
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
        <div>
          <span>{field}</span>
          <span>{value}</span>
        </div>
      );
    });
  }

  return (
    <div>
      <h1>New Jet</h1>

      <div>
        {errorMessage}
        <form onSubmit={() => submitHandler}>
          {formOutput}
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default newJet;
