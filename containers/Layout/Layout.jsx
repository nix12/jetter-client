import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Container from '@material-ui/core/Container';
import * as actions from '../../store/actions/index';

class Layout extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignup();
  }

  render () {
    const { children, isLoggedIn } = this.props;

    return (
      <div>
        <Toolbar user={ this.props.username } loggedIn={ isLoggedIn } />
        
        <Container>
          { children }
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.currentUser.isLoggedIn,
    username: state.auth.currentUser.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
