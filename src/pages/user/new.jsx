import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Template from '../../templates/user/new.template';

const New = props => <Template {...props} />;

const mapStateToProps = state => ({
  error: state.register.error
});

const mapDispatchToProps = dispatch => ({
  onRegister: (username, password, passwordConfirmation) =>
    dispatch(actions.register(username, password, passwordConfirmation))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(New)
);
