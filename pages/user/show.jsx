import React, { Component } from 'react';
import { connect } from 'react-redux';

import User from '../../components/User/User';
import Layout from '../../containers/Layout/Layout';

class Show extends Component { 
  static async getInitialProps ({ req, isServer }) {
    if (isServer) {
      return {
        userId: req.userId,
        username: req.username,
      }
    }
  }
  

  render() {
    return (
      <Layout>
        <h1>My Profile</h1>

        <User 
          id={ this.props.userId }
          username={ this.props.username } 
        />
      </Layout>    
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.currentUser.userId,
    username: state.auth.currentUser.username
  }
}

export default connect(mapStateToProps)(Show);