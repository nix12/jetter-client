import React, { Component } from 'react';
import { connect } from 'react-redux';

import Template from '../../templates/user/show.template';

class Show extends Component {
  render() {
    return <Template {...this.props} />;
  }
}

const mapStateToProps = state => ({
  userId: state.auth.currentUser.userId,
  username: state.auth.currentUser.username
});

export default connect(mapStateToProps)(Show);
