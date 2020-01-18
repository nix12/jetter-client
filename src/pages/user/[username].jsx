import React from 'react';
import { connect } from 'react-redux';

import Template from '../../templates/user/show.template';

const show = props => <Template {...props} />;

const mapStateToProps = state => ({
  userId: state.auth.currentUser.userId,
  username: state.auth.currentUser.username
});

export default connect(mapStateToProps)(show);
