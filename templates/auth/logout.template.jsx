import React, { Component } from 'react';

class Template extends Component {
  componentDidMount() {
    const { onLogout, router } = this.props;

    setTimeout(() => {
      onLogout();
      setTimeout(() => router.push('/auth', '/login'), 100);
    }, 100);
  }

  render() {
    return null;
  }
}

export default Template;
