import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

import { updateObject, checkValidity } from '../../../shared/utility';
import { createPost } from '../../../store/actions/index';

const newPost = props => {
  const { error } = props;

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
      body: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          placeholder: 'Body',
          rowsMin: '20',
          cols: '80'
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

  const router = useRouter();
  const dispatch = useDispatch();

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

    const { jetId } = router.query;

    dispatch(
      createPost(form.controls.title.value, form.controls.body.value, jetId)
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

  let errorMessage = null;

  if (error) {
    Object.entries(error).map(([key, value]) => {
      const field = key.charAt(0).toUpperCase() + key.slice(1);

      errorMessage = (
        <div>
          <span>{field}</span>
          <span>{value}</span>
        </div>
      );

      return errorMessage;
    });
  }

  return (
    <div>
      <h1>New Post</h1>

      <div>
        {errorMessage}
        <form onSubmit={submitHandler}>
          {formOutput}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default newPost;
