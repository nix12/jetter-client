import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Alert } from '@material-ui/lab';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

import { updateObject, checkValidity } from '../../shared/utility';
import { createLink } from '../../store/actions/index';

const LinkForm = props => {
  const { value, index } = props;

  const [form, setForm] = useState({
    controls: {
      title: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Title'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      uri: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'URI'
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

  const router = useRouter();
  const dispatch = useDispatch();
  const submitHandler = event => {
    event.preventDefault();

    const { jetId } = router.query;

    dispatch(
      createLink(form.controls.title.value, form.controls.uri.value, jetId)
    ).then(response => {
      if (response.status === 201) {
        router.push('/j/[jetId]', `/j/${jetId}`);
      }
    });
  };

  const formElementsArray = [];
  Object.keys(form.controls).map(key => {
    return formElementsArray.push({
      id: key,
      config: form.controls[key]
    });
  });

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

  const error = useSelector(state => state.link.error);
  let errorMessage = null;
  if (error) {
    errorMessage = Object.entries(error).map(([key, value]) => {
      const field = key.charAt(0).toUpperCase() + key.slice(1);

      return value.map(v => (
        <Alert key={v} severity="error">
          {field}: {v}
        </Alert>
      ));
    });
  }

  return (
    value === index && (
      <div>
        {errorMessage}
        <form onSubmit={submitHandler}>
          {formOutput}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    )
  );
};

export default LinkForm;
