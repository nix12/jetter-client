import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Template from '../../templates/user/update.template';

class Update extends Component {
  render() {
    return <Template {...this.props} />;
  }
}

const mapStateToProps = state => ({
  loading: state.user.loading,
  error: state.user.error
});

const mapDispatchToProps = dispatch => ({
  onUpdate: (username, current_password, password, password_confirmation) =>
    dispatch(
      actions.update(
        username,
        current_password,
        password,
        password_confirmation
      )
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Update);
