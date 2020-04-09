import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PostForm from '../../../components/Forms/Post';
import LinkForm from '../../../components/Forms/Link';

const allyProps = index => {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-panel-${index}`
  };
};

const NewPost = props => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Tabs variant="fullWidth" value={value} onChange={handleChange}>
        <Tab
          label="Text Post"
          component="a"
          onClick={event => event.preventDefault()}
          {...props}
          {...allyProps(0)}
        />
        <Tab
          label="Link Post"
          component="a"
          onClick={event => event.preventDefault()}
          {...props}
          {...allyProps(1)}
        />
      </Tabs>
      <PostForm value={value} index={0} />
      <LinkForm value={value} index={1} />
    </div>
  );
};

export default NewPost;
