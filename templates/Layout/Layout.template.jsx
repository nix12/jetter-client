import React, { Component } from 'react';

import Container from '@material-ui/core/Container';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Template extends Component {
  componentDidMount() {
    const { onTryAutoSignup } = this.props;

    onTryAutoSignup();
  }

  render() {
    const { children, isLoggedIn, username } = this.props;

    return (
      <div>
        <Toolbar user={username} loggedIn={isLoggedIn} />

        <Container>{children}</Container>
      </div>
    );
  }
}

export default Template;
