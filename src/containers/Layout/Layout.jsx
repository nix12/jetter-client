import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Alert } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Button from '@material-ui/core/Button';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import DefaultJets from '../../components/Navigation/DefaultJets/DefaultJets';
import Trending from '../../components/Navigation/Trending/Trending';
import LoggedIn from '../../components/Permissions/LoggedIn';
import {
  authCheckState,
  getUpvoted,
  getDownvoted,
  getSavedPosts,
  getSavedComments
} from '../../store/actions/index';

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
  },
  trending: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const Layout = props => {
  const { children } = props;

  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const username = useSelector(state => state.auth.currentUser.username);
  const isLoggedIn = useSelector(state => state.auth.currentUser.isLoggedIn);
  const error = useSelector(state => state.auth.error);

  const { jetId } = router.query;

  useEffect(() => setLoading(false), [loading]);
  useEffect(() => dispatch(authCheckState()), []);

  useEffect(() => {
    if (username) {
      dispatch(getUpvoted(username));
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      dispatch(getDownvoted(username));
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      dispatch(getSavedPosts(username));
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      dispatch(getSavedComments(username));
    }
  }, [username]);

  let errorMessage = null;
  if (error) {
    errorMessage = <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <Toolbar user={username} loggedIn={isLoggedIn} />
      <h3 style={{ textAlign: 'center' }}>UNDER CONSTRUCTION</h3>
      <div className={classes.jets}>
        <DefaultJets />
      </div>
      {errorMessage}
      <Container className={classes.layout}>
        <Grid lg={8} item>
          {children}
        </Grid>
        <Grid lg={2} item className={classes.buttons}>
          <LoggedIn>
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
          </LoggedIn>
          <Grid>
            {loading ? (
              <CircularProgress />
            ) : (
              <Trending setLoading={setLoading} />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Layout;
