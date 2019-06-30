import React, { Component } from 'react';
import Cookies from 'universal-cookie';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Can from '../../components/Permission/Can';
import { checkValidity, updateObject } from '../../shared/utility';

class Template extends Component {
  state = {
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
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });

    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();

    const cookies = new Cookies();

    return Promise.resolve(
      this.props.onUpdate(
        cookies.get('username'),
        this.state.controls.current_password.value,
        this.state.controls.password.value,
        this.state.controls.password_confirmation.value
      )
    ).then(() => {
      this.forceUpdate(); // clear state, remove forceUpdate();
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form = <CircularProgress />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>;
    }

    return (
      <div>
        <h1>Update Password</h1>

        {errorMessage}

        <Can I="manage" this="User">
          <form onSubmit={this.submitHandler}>
            {form}
            <Button>Submit</Button>
          </form>
        </Can>
      </div>
    );
  }
}

export default Template;
