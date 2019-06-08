import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import CircularProgress from '@material-ui/core/CircularProgress';
import * as actions from '../../store/actions/index';

class Logout extends Component {
  componentDidMount = () => {
    this.logoutAndRedirect();
  };

  logoutAndRedirect = () => {
    const { onLogout } = this.props;

    onLogout()
      .then(() => {
        Router.push('/');
      })
  }

  render () {
    return <CircularProgress />;
  } 
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);