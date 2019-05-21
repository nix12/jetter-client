import React, { Component } from 'react';
import Link from 'next/link'
import Router from 'next/router';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class New extends Component {
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
          required: true,
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
    },
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    });

    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    event.preventDefault();
    const { onRegister } = this.props;
    
    onRegister(
      this.state.controls.username.value,
      this.state.controls.password.value,
      this.state.controls.password_confirmation.value,
    )
      .then(response => {
        if (!this.props.error) {
          Router.push('/index');
        }
      })
  }

  render () {
    const formElementsArray = []
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={ formElement.id }
        elementType={ formElement.config.elementType }
        elementConfig={ formElement.config.elementConfig }
        value={ formElement.config.value }
        invalid={ !formElement.config.valid }
        shouldValidate={ formElement.config.validation }
        touched={ formElement.config.touched }
        changed={ (event) => this.inputChangedHandler(event,formElement.id) }
      />
    ));

    let errorMessage = null;

    if (this.props.error) {
      Object.entries(this.props.error).map(([key, value], i) => {
        const field = key.charAt(0).toUpperCase() + key.slice(1);
        errorMessage = (
          <p>{ field } { value }.</p>
        )
      });
    }

    return (
      <div>
        <h1>Sign Up</h1>

        <Link href='/index'>
          <a>Home</a>
        </Link>

        <div>
          { errorMessage }
          <form onSubmit={ this.submitHandler }>
            { form }
            <Button>Submit</Button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.register.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (username, password, password_confirmation) => dispatch(actions.register(
      username, 
      password, 
      password_confirmation
    )),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(New);