import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Template from '../../templates/auth/login.template';

const login = props => <Template {...props} />;

const mapStateToProps = state => ({
  userId: state.auth.currentUser.userId,
  username: state.auth.currentUser.username,
  loading: state.auth.currentUser.loading,
  error: state.auth.currentUser.error
});

const mapDispatchToProps = dispatch => ({
  onAuth: (username, password) => dispatch(actions.auth(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(login);
