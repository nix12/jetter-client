import React, { Component } from 'react';

import User from '../../components/User/User';

class Template extends Component {
  static async getInitialProps({ req, isServer }) {
    if (isServer) {
      return {
        userId: req.userId,
        username: req.username
      };
    }
  }

  render() {
    const { userId, username } = this.props;

    return (
      <div>
        <h1>My Profile</h1>

        <User id={userId} username={username} />
      </div>
    );
  }
}

export default Template;
