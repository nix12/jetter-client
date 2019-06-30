import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Template from '../../templates/user/new.template';

class New extends Component {
  render() {
    return <Template {...this.props} />;
  }
}

const mapStateToProps = state => ({
  error: state.register.error
});

const mapDispatchToProps = dispatch => ({
  onRegister: (username, password, password_confirmation) =>
    dispatch(actions.register(username, password, password_confirmation))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(New)
);
