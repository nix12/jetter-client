import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Button from '@material-ui/core/Button';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import JetList from '../../components/UI/JetList/JetList';

const useStyles = makeStyles({
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '20em'
    // backgroundColor: 'black'
  },
  layout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: 'salmon',
    marginTop: '2em',
    width: '100%'
  },
  jets: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

const template = props => {
  const { children, isLoggedIn, username, onTryAutoSignup } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { jetId } = router.query;

  useEffect(() => setLoading(false), [loading]);
  useEffect(() => onTryAutoSignup(), []);

  return (
    <div>
      <Toolbar user={username} loggedIn={isLoggedIn} />
      <div className={classes.jets}>
        {loading ? <CircularProgress /> : <JetList setLoading={setLoading} />}
      </div>
      <Container className={classes.layout}>
        <div>{children}</div>
        <div className={classes.buttons}>
          <Link href="/j/new">
            <Button color="primary" variant="contained">
              Create Jet
            </Button>
          </Link>
          {_.includes(Object.keys(router.query), 'jetId') ? (
            <Link href="/j/[jetId]/new" as={`/j/${jetId}/new`}>
              <Button color="primary" variant="contained">
                Create Post
              </Button>
            </Link>
          ) : null}
        </div>
      </Container>
    </div>
  );
};

export default template;
