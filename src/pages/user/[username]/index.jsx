import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Profile from '../../../containers/User/Profile';
import PostHistory from '../../../containers/User/PostHistory';
import SavedPosts from '../../../containers/User/SavedItems';

import redirectTo from '../../../shared/redirectTo';

const User = () => {
  const [value, setValue] = useState('Profile');

  const userId = useSelector(state => state.auth.currentUser.userId);
  const username = useSelector(state => state.auth.currentUser.username);

  const handleChange = event => {
    event.preventDefault();
    setValue(event.target.value);
  };

  return (
    <div>
      <Select defaultValue="Profile" value={value} onChange={handleChange}>
        <MenuItem value="Profile">Profile</MenuItem>
        <MenuItem value="Post History">Post History</MenuItem>
        <MenuItem value="Saved Posts">Saved Posts</MenuItem>
      </Select>
      <Profile value={value} index="Profile" />
      <PostHistory value={value} index="Post History" />
      <SavedPosts value={value} index="Saved Posts" />
    </div>
  );
};

User.getInitialProps = async ({ res, isServer }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  if (!token && !isServer) {
    redirectTo('/login');
  }

  return {};
};

export default User;
