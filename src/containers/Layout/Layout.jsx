import React from 'react';
import { connect } from 'react-redux';

import Template from '../../templates/Layout/Layout.template';
import * as actions from '../../store/actions/index';

const layout = props => <Template {...props} />;

const mapStateToProps = state => ({
  isLoggedIn: state.auth.currentUser.isLoggedIn,
  username: state.auth.currentUser.username
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(layout);
