import React, { useState } from 'react';
import Link from 'next/link';
import Moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowUp from '@material-ui/icons/ArrowUpward';
import ArrowDown from '@material-ui/icons/ArrowDownward';

import axios from '../../../services/axios/axios-forum';

const useStyles = makeStyles({
  card: {
    width: '50em',
    display: 'flex',
    flexDirection: 'row'
  },
  info: {
    fontSize: 14
  },
  votes: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  voted: {
    color: 'orange'
  },
  score: {
    textAlign: 'center'
  },
  user: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  },
  jet: {
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  }
});

const post = props => {
  const {
    username,
    createdAt,
    score,
    jetId,
    hashId,
    title,
    setUpdatePosts
  } = props;

  const upvote = (jet, id) => axios.put(`/api/jets/${jet}/posts/${id}/upvote`);
  const downvote = (jet, id) =>
    axios.put(`/api/jets/${jet}/posts/${id}/downvote`);
  const unvote = (jet, id) => axios.put(`/api/jets/${jet}/posts/${id}/unvote`);

  const classes = useStyles();
  const now = new Moment();
  const created = new Moment(createdAt);
  const duration = Moment.duration(created.diff(now)).humanize();

  const [up, setUpvote] = useState(false);
  const [down, setDownvote] = useState(false);

  const upvoted = async (jet, id) => {
    if (up) {
      await unvote(jet, id).then(() => setUpvote(false));
    } else {
      await upvote(jet, id).then(() => setUpvote(true));
    }

    setUpdatePosts(true);
  };

  const downvoted = (jet, id) => {
    if (down) {
      setDownvote(false);
      unvote(jet, id);
    } else {
      setDownvote(true);
      downvote(jet, id);
    }
  };

  return (
    <Card className={classes.card}>
      <div className={classes.votes}>
        <ArrowUp
          onClick={() => upvoted(jetId, hashId)}
          className={up ? classes.voted : ''}
        />
        <div className={classes.score}>{score}</div>
        <ArrowDown
          onClick={() => downvoted(jetId, hashId)}
          className={down ? classes.voted : ''}
        />
      </div>
      <div>
        <CardContent>
          <Typography
            className={classes.info}
            color="textSecondary"
            gutterBottom
          >
            <Link href="/j/[jetId]" as={`/j/${jetId}`}>
              <span className={classes.jet}>
                j/
                {jetId}
              </span>
            </Link>
            &nbsp;&bull; Posted by&nbsp;
            <Link href="/user/[username]" as={`/user/${username}`}>
              <span className={classes.user}>
                u/
                {username}
              </span>
            </Link>
            &nbsp;
            {duration}
            &nbsp;ago
          </Typography>
          <Typography variant="h6" component="p">
            {title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">comments</Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default post;
