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
import Divider from '@material-ui/core/Divider';

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
    postId,
    title,
    body,
    comments,
    setUpdatePost
  } = props;

  const upvote = (jet, post) =>
    axios.put(`/api/jets/${jet}/posts/${post}/upvote`);
  const downvote = (jet, post) =>
    axios.put(`/api/jets/${jet}/posts/${post}/downvote`);
  const unvote = (jet, post) =>
    axios.put(`/api/jets/${jet}/posts/${post}/unvote`);

  const classes = useStyles();
  const now = new Moment();
  const created = new Moment(createdAt);
  const duration = Moment.duration(created.diff(now)).humanize();

  const [up, setUpvote] = useState(false);
  const [down, setDownvote] = useState(false);

  const upvoted = async (jet, post) => {
    if (up) {
      await unvote(jet, post).then(() => setUpvote(false));
    } else {
      await upvote(jet, post).then(() => setUpvote(true));
    }

    setUpdatePost(true);
  };

  const downvoted = async (jet, post) => {
    if (down) {
      await unvote(jet, post).then(() => setDownvote(false));
    } else {
      await downvote(jet, post).then(() => setDownvote(true));
    }

    setUpdatePost(true);
  };

  const switchVote = async (jet, post) => {
    await unvote(jet, post).then(() => {
      setUpvote(false);
      setDownvote(false);
    });

    if (up) {
      downvoted(jet, post);
    }

    if (down) {
      upvoted(jet, post);
    }

    setUpdatePost(true);
  };

  return (
    <Card className={classes.card}>
      <div className={classes.votes}>
        <ArrowUp
          onClick={
            !down
              ? () => upvoted(jetId, postId)
              : () => switchVote(jetId, postId)
          }
          className={up ? classes.voted : ''}
        />
        <div className={classes.score}>{score}</div>
        <ArrowDown
          onClick={
            !up
              ? () => downvoted(jetId, postId)
              : () => switchVote(jetId, postId)
          }
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
            <Link href="/j/[jetpost]" as={`/j/${jetId}`}>
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
          <Link href="/j/[jetId]/[postId]" as={`/j/${jetId}/${postId}`}>
            <a style={{ textDecoration: 'none' }}>
              <Typography variant="h6" component="p">
                {title}
              </Typography>
            </a>
          </Link>
          {body ? <Divider /> : null}
          <Typography variant="h6" component="p">
            {body}
          </Typography>
        </CardContent>
        <CardActions>
          <Link href="/j/[jetId]/[postId]" as={`/j/${jetId}/${postId}`}>
            <Button size="small">
              <span>{comments}</span>
              &nbsp;comments
            </Button>
          </Link>
          <Link
            href="/j/[jetId]/[postId]/edit"
            as={`/j/${jetId}/${postId}/edit`}
          >
            <Button size="small">edit</Button>
          </Link>
          <Button size="small">delete</Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default post;
