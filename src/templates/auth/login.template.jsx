import React, { Component } from 'react';
import ability from '../../services/casl/ability';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { updateObject, checkValidity } from '../../shared/utility';

class Template extends Component {
  state = {
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

    const { onAuth } = this.props;

    return Promise.resolve(
      onAuth(
        this.state.controls.username.value,
        this.state.controls.password.value
      )
    );
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

    let abilities = ability.rules.map((rule, index) => (
      <label key={index} style={{ display: 'block' }}>
        rules [{rule.actions}: {rule.subject}]
      </label>
    ));

    return (
      <div>
        <h1>Auth</h1>

        <div>
          {errorMessage}
          <form onSubmit={this.submitHandler}>
            {form}
            <Button type="submit">Submit</Button>
          </form>
        </div>

        <div>
          <label style={{ display: 'block' }}>ID: {this.props.userId}</label>
          <label style={{ display: 'block' }}>
            Username: {this.props.username}
          </label>
          {abilities}
        </div>
      </div>
    );
  }
}

export default Template;
