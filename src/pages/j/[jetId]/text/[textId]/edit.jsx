import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import Button from '../../../../../components/UI/Button/Button';
import Input from '../../../../../components/UI/Input/Input';

import { updateObject, checkValidity } from '../../../../../shared/utility';
import { updateText } from '../../../../../store/actions/index';

import axios from '../../../../../services/axios/axios-forum';

const editText = props => {
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

  useEffect(() => {
    const fetchText = async () => {
      const { jetId, textId } = router.query;
      const textData = await axios.get(`/api/jets/${jetId}/texts/${textId}`);

      setForm(prevState => ({
        ...prevState,
        controls: {
          ...prevState.controls,
          title: {
            ...prevState.title,
            value: textData.data.text.title
          },
          body: {
            ...prevState.body,
            value: textData.data.text.body
          }
        }
      }));
    };

    fetchText();
  }, []);

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

    const { jetId, textId } = router.query;

    dispatch(
      updateText(
        form.controls.title.value,
        form.controls.body.value,
        jetId,
        textId
      )
    ).then(response => {
      if (response.status === 204) {
        router.push('/j/[jetId]/text/[textId]', `/j/${jetId}/text/${textId}`);
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
      <h1>New Text</h1>

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

export default editText;