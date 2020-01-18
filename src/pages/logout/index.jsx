import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Template from '../../templates/auth/logout.template';

class Logout extends Component {
  render() {
    return <Template {...this.props} />;
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout())
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Logout)
);
