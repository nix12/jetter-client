import React from 'react';

import Menu from '@material-ui/core/Menu';
import NavigationItem from './NavigationsItem/NavigationItem';

const navigationItems = (props) => {
  const { name } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleMenuClose() {
    setAnchorEl(null);
  }

  return (
    <Menu 
      { ...props }
    >
      <NavigationItem 
        click={ handleMenuClose } 
        link='/user/show' 
        linkAs={ `/u/${ name }` }
        userName={ name }
      >
        My Profile
      </NavigationItem>

      <NavigationItem 
        click={ handleMenuClose } 
        link='/user/update'
        linkAs={ `/u/${ name }/password` }
      >
        Change Password
      </NavigationItem>

      <NavigationItem 
        click={ handleMenuClose } 
        link='/auth/logout'
        linkAs='/logout'
      >
        Logout
      </NavigationItem>
    </Menu>
  )
}

export default navigationItems;
