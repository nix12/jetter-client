import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import Can from '../../Permissions/Can';
import { deleteText } from '../../../store/actions';

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

const Text = props => {
  const {
    text,
    username,
    createdAt,
    score,
    jetId,
    textId,
    title,
    body,
    comments,
    setUpdateText
  } = props;

  const upvote = (jet, text) =>
    axios.put(`/api/jets/${jet}/texts/${text}/upvote`);
  const downvote = (jet, text) =>
    axios.put(`/api/jets/${jet}/texts/${text}/downvote`);
  const unvote = (jet, text) =>
    axios.put(`/api/jets/${jet}/texts/${text}/unvote`);

  const classes = useStyles();
  const now = new Moment();
  const created = new Moment(createdAt);
  const duration = Moment.duration(created.diff(now)).humanize();

  const [up, setUpvote] = useState(false);
  const [down, setDownvote] = useState(false);

  const upvoted = async (jet, text) => {
    if (up) {
      await unvote(jet, text).then(() => setUpvote(false));
    } else {
      await upvote(jet, text).then(() => setUpvote(true));
    }

    setUpdateText(true);
  };

  const downvoted = async (jet, text) => {
    if (down) {
      await unvote(jet, text).then(() => setDownvote(false));
    } else {
      await downvote(jet, text).then(() => setDownvote(true));
    }

    setUpdateText(true);
  };

  const switchVote = async (jet, text) => {
    await unvote(jet, text).then(() => {
      setUpvote(false);
      setDownvote(false);
    });

    if (up) {
      downvoted(jet, text);
    }

    if (down) {
      upvoted(jet, text);
    }

    setUpdateText(true);
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const removeText = () => {
    dispatch(deleteText(jetId, textId)).then(response => {
      if (response.status === 204) {
        router.reload();
      }
    });
  };

  return (
    <Card className={classes.card}>
      <div className={classes.votes}>
        <ArrowUp
          onClick={
            !down
              ? () => upvoted(jetId, textId)
              : () => switchVote(jetId, textId)
          }
          className={up ? classes.voted : ''}
        />
        <div className={classes.score}>{score}</div>
        <ArrowDown
          onClick={
            !up
              ? () => downvoted(jetId, textId)
              : () => switchVote(jetId, textId)
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
            <Link href="/j/[jetId]" as={`/j/${jetId}`}>
              <span className={classes.jet}>
                j/
                {jetId}
              </span>
            </Link>
            &nbsp;&bull; Posted by&nbsp;
            <Link href="/user/[username]" as={`/user/${username}`}>
              <span className={classes.user}>
                {username === '[deleted]' ? username : `u/${username}`}
              </span>
            </Link>
            &nbsp;
            {duration}
            &nbsp;ago
          </Typography>
          <Link
            href="/j/[jetId]/text/[textId]"
            as={`/j/${jetId}/text/${textId}`}
          >
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
          <Link
            href="/j/[jetId]/text/[textId]"
            as={`/j/${jetId}/text/${textId}`}
          >
            <Button size="small">
              <span>{comments}</span>
              &nbsp;comments
            </Button>
          </Link>
          <Can do="update" on={text}>
            <Link
              href="/j/[jetId]/text/[textId]/edit"
              as={`/j/${jetId}/text/${textId}/edit`}
            >
              <Button size="small">edit</Button>
            </Link>
          </Can>
          <Can do="delete" on={text}>
            <Button size="small" onClick={() => removeText}>
              delete
            </Button>
          </Can>
        </CardActions>
      </div>
    </Card>
  );
};

export default Text;
