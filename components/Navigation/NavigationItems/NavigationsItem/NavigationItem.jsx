import React from 'react';
import Link from 'next/link';

import MenuItem from '@material-ui/core/MenuItem';

const navigationItem = React.forwardRef((props, ref) => {
  const { children, link, click, linkAs } = props;

  return (
    <MenuItem ref={ ref } onClick={ click }>
      <Link href={ link } as={ linkAs }>
        <a>{ children }</a>
      </Link>
    </MenuItem>
  )
})

export default navigationItem;
