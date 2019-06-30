import React from 'react';

import Menu from '@material-ui/core/Menu';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
  const { name, onClose } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <Menu {...props}>
      <NavigationItem
        click={onClose}
        link="/user/show"
        linkAs={`/u/${name}`}
        userName={name}
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

      <NavigationItem click={onClose} link="/auth/logout" linkAs="/logout">
        Logout
      </NavigationItem>
    </Menu>
  );
};

export default navigationItems;
