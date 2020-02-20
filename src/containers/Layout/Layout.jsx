import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Button from '@material-ui/core/Button';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import JetList from '../../components/UI/JetList/JetList';
import { authCheckState } from '../../store/actions/index';

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

const layout = props => {
  const { children } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector(state => state.auth.currentUser.username);
  const isLoggedIn = useSelector(state => state.auth.currentUser.isLoggedIn);
  const { jetId } = router.query;

  useEffect(() => setLoading(false), [loading]);
  useEffect(() => dispatch(authCheckState()), []);

  return (
    <div>
      <Toolbar user={username} loggedIn={isLoggedIn} />
      <h3 style={{ textAlign: 'center' }}>UNDER CONSTRUCTION</h3>
      <div className={classes.jets}>
        {loading ? <CircularProgress /> : <JetList setLoading={setLoading} />}
      </div>
      <Container className={classes.layout}>
        <div>{children}</div>
        {isLoggedIn ? (
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
        ) : null}
      </Container>
    </div>
  );
};

export default layout;
