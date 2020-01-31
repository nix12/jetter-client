import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { updateObject, checkValidity } from '../../shared/utility';
import { createComment } from '../../store/actions/index';

const commentForm = props => {
  const { commentId, setUpdateComment, toggle, setToggle, rows, cols } = props;

  const router = useRouter();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    controls: {
      body: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          rowsMin: rows,
          cols
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

    const { jetId, postId } = router.query;

    dispatch(
      createComment(
        form.controls.body.value,
        jetId,
        postId,
        commentId || postId,
        commentId ? 'Comment' : 'Post',
        commentId || null
      )
    ).then(response => {
      if (response.status === 201) {
        setUpdateComment(true);
        form.controls.body.value = '';
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

  return toggle ? (
    <form onSubmit={submitHandler}>
      {formOutput}
      <Button type="submit">Submit</Button>
      {commentId ? (
        <Button type="button" clicked={() => setToggle(false)}>
          Cancel
        </Button>
      ) : null}
    </form>
  ) : null;
};

export default commentForm;
