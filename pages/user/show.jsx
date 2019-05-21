import React, { Component } from 'react';

import User from '../../components/User/User';

class Show extends Component { 
  render() {
    return (
      <User 
        id={ localStorage.getItem('userId') }
        username={ localStorage.getItem('username') } 
      />
    )
  }
}

export default Show;