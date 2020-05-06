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

import axios from '../../../services/axios/axios-forum';
import Can from '../../Permissions/Can';
import { deleteLink } from '../../../store/actions';

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

const LinkUI = props => {
  const {
    link,
    username,
    createdAt,
    score,
    jetId,
    linkId,
    title,
    uri,
    comments,
    setUpdatelink
  } = props;

  const upvote = (jet, link) =>
    axios.put(`/api/jets/${jet}/links/${link}/upvote`);
  const downvote = (jet, link) =>
    axios.put(`/api/jets/${jet}/links/${link}/downvote`);
  const unvote = (jet, link) =>
    axios.put(`/api/jets/${jet}/links/${link}/unvote`);

  const classes = useStyles();
  const now = new Moment();
  const created = new Moment(createdAt);
  const duration = Moment.duration(created.diff(now)).humanize();

  const [up, setUpvote] = useState(false);
  const [down, setDownvote] = useState(false);

  const upvoted = async (jet, link) => {
    if (up) {
      await unvote(jet, link).then(() => setUpvote(false));
    } else {
      await upvote(jet, link).then(() => setUpvote(true));
    }

    setUpdatelink(true);
  };

  const downvoted = async (jet, link) => {
    if (down) {
      await unvote(jet, link).then(() => setDownvote(false));
    } else {
      await downvote(jet, link).then(() => setDownvote(true));
    }

    setUpdatelink(true);
  };

  const switchVote = async (jet, link) => {
    await unvote(jet, link).then(() => {
      setUpvote(false);
      setDownvote(false);
    });

    if (up) {
      downvoted(jet, link);
    }

    if (down) {
      upvoted(jet, link);
    }

    setUpdatelink(true);
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const removeLink = () => {
    dispatch(deleteLink(jetId, linkId)).then(response => {
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
              ? () => upvoted(jetId, linkId)
              : () => switchVote(jetId, linkId)
          }
          className={up ? classes.voted : ''}
        />
        <div className={classes.score}>{score}</div>
        <ArrowDown
          onClick={
            !up
              ? () => downvoted(jetId, linkId)
              : () => switchVote(jetId, linkId)
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
            &nbsp;&bull; posted by&nbsp;
            <Link href="/user/[username]" as={`/user/${username}`}>
              <span className={classes.user}>
                {username === '[deleted]' ? username : `u/${username}`}
              </span>
            </Link>
            &nbsp;
            {duration}
            &nbsp;ago
          </Typography>
          <a href={`http://${uri}`} style={{ textDecoration: 'none' }}>
            <Typography variant="h6" component="p">
              {title}
            </Typography>
          </a>
        </CardContent>
        <CardActions>
          <Link
            href="/j/[jetId]/link/[linkId]"
            as={`/j/${jetId}/link/${linkId}`}
          >
            <Button size="small">
              comments&nbsp;
              <span>({comments})</span>
            </Button>
          </Link>
          <Can do="update" on={link}>
            <Link
              href="/j/[jetId]/link/[linkId]/edit"
              as={`/j/${jetId}/link/${linkId}/edit`}
            >
              <Button size="small">edit</Button>
            </Link>
          </Can>
          <Can do="delete" on={link}>
            <Button size="small" onClick={() => removeLink}>
              delete
            </Button>
          </Can>
        </CardActions>
      </div>
    </Card>
  );
};

export default LinkUI;
