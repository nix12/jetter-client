import React, { useEffect } from 'react';

import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import JetList from '../../components/UI/JetList/JetList';

const useStyles = makeStyles({
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '20em',
    backgroundColor: 'black'
  },
  layout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'salmon',
    marginTop: '2em',
    width: '100%'
  }
});

const template = props => {
  const { children, isLoggedIn, username, onTryAutoSignup, jetId } = props;
  const classes = useStyles();

  useEffect(() => onTryAutoSignup(), []);

  return (
    <div>
      <Toolbar user={username} loggedIn={isLoggedIn} />
      <JetList />
      <Container className={classes.layout}>
        {children}
        <div className={classes.buttons}>
          <Link href="/j/new">
            <Button color="primary" variant="contained">
              Create Jet
            </Button>
          </Link>
          <Link href="/j/[jetId]" as={`/j/${jetId}`}>
            <Button color="primary" variant="contained">
              Create Post
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default template;
