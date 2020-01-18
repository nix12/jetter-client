import React from 'react';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

import Menu from '@material-ui/core/Menu';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
  const { name, onClose } = props;
  const cookies = new Cookies();
  const token = cookies.get('token');
  const data = token ? jwtDecode(token) : '';
  const { username } = data;
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <Menu {...props}>
      <NavigationItem
        click={onClose}
        link="/user/[username]"
        linkAs={`/user/${username}`}
        userName={username}
      >
        My Profile
      </NavigationItem>

      <NavigationItem
        click={onClose}
        link="/user/update"
        linkAs={`/u/${name}/password`}
      >
        Change Password
      </NavigationItem>

      <NavigationItem click={onClose} link="/logout" linkAs="/logout">
        Logout
      </NavigationItem>
    </Menu>
  );
};

export default navigationItems;
