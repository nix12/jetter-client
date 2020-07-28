import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Moment from 'moment';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowUp from '@material-ui/icons/ArrowUpward';
import ArrowDown from '@material-ui/icons/ArrowDownward';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider';

import axios from '../../../services/axios/axios-forum';
import Can from '../../Permissions/Can';
import RedirectToLogin from '../../Permissions/RedirectToLogin';
import { deletePost, save, unsave } from '../../../store/actions/index';

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
    typeAlign: 'center'
  },
  user: {
    '&:hover': {
      cursor: 'pointer',
      typeDecoration: 'underline'
    }
  },
  jet: {
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
      typeDecoration: 'underline'
    }
  }
});

const Post = props => {
  const {
    post,
    type,
    username,
    createdAt,
    score,
    jetId,
    postId,
    title,
    body,
    comments,
    setUpdatePost,
    style
  } = props;

  const upvote = (jet, type, postId) =>
    axios.put(`/api/jets/${jet}/${type}s/${postId}/upvote`);
  const downvote = (jet, type, postId) =>
    axios.put(`/api/jets/${jet}/${type}s/${postId}/downvote`);
  const unvote = (jet, type, postId) =>
    axios.put(`/api/jets/${jet}/${type}s/${postId}/unvote`);

  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const now = new Moment();
  const created = new Moment(createdAt);
  const duration = Moment.duration(created.diff(now)).humanize();

  const [up, setUpvote] = useState(false);
  const [down, setDownvote] = useState(false);
  const [saved, setSaved] = useState(false);

  const upvotedList = useSelector(state => state.user.voter.votes.upvoted);
  const downvotedList = useSelector(state => state.user.voter.votes.downvoted);
  const savedList = useSelector(state => state.user.voter.saved);

  const upvoted = async (jet, type, postId) => {
    if (up) {
      await unvote(jet, type, postId).then(() => setUpvote(false));
    } else {
      await upvote(jet, type, postId).then(() => setUpvote(true));
    }

    setUpdatePost(true);
  };

  const downvoted = async (jet, type, postId) => {
    if (down) {
      await unvote(jet, type, postId).then(() => setDownvote(false));
    } else {
      await downvote(jet, type, postId).then(() => setDownvote(true));
    }

    setUpdatePost(true);
  };

  const switchVote = async (jet, type, postId) => {
    await unvote(jet, type, postId).then(() => {
      setUpvote(false);
      setDownvote(false);
    });

    if (up) {
      downvoted(jet, type, postId);
    }

    if (down) {
      upvoted(jet, type, postId);
    }

    setUpdatePost(true);
  };

  const removePost = () => {
    dispatch(deletePost(jetId, type, postId)).then(response => {
      if (response.status === 204) {
        router.reload();
      }
    });
  };

  const checkVote = list => {
    return _.includes(_.map(list, 'hash_id'), postId);
  };

  const checkSaved = list => {
    return _.includes(_.map(list, 'post_id'), postId);
  };

  useEffect(() => setUpvote(checkVote(upvotedList)), [upvotedList]);
  useEffect(() => setDownvote(checkVote(downvotedList)), [downvotedList]);
  useEffect(() => setSaved(checkSaved(savedList)), [savedList]);

  const savePost = () => {
    dispatch(save(username, postId, null));
  };

  const unsavePost = () => {
    dispatch(unsave(username, postId, null));
  };

  const toggleSave = () => {
    console.log('toggleSave');
    if (!saved) {
      savePost();
    }

    if (saved) {
      unsavePost();
    }
  };

  return (
    <Card className={classes.card} style={style}>
      <div className={classes.votes}>
        <RedirectToLogin>
          <ArrowUp
            onClick={
              !down
                ? () => upvoted(jetId, type, postId)
                : () => switchVote(jetId, type, postId)
            }
            className={up ? classes.voted : ''}
          />
        </RedirectToLogin>
        <div className={classes.score}>{score}</div>
        <RedirectToLogin>
          <ArrowDown
            onClick={
              !up
                ? () => downvoted(jetId, type, postId)
                : () => switchVote(jetId, type, postId)
            }
            className={down ? classes.voted : ''}
          />
        </RedirectToLogin>
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
            href="/j/[jetId]/[type]/[postId]"
            as={`/j/${jetId}/${type}/${postId}`}
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
            href="/j/[jetId]/[type]/[postId]"
            as={`/j/${jetId}/${type}/${postId}`}
          >
            <Button size="small">
              <span>{comments}</span>
              &nbsp;comments
            </Button>
          </Link>
          <Can do="update" on={post}>
            <Link
              href="/j/[jetId]/[type]/[postId]/edit"
              as={`/j/${jetId}/${type}/${postId}/edit`}
            >
              <Button size="small">edit</Button>
            </Link>
          </Can>
          <Can do="delete" on={post}>
            <Button size="small" onClick={() => removePost}>
              delete
            </Button>
          </Can>
          <Can do="create" on={post}>
            <Button size="small" onClick={() => toggleSave()}>
              {saved ? <Star /> : <StarBorder />}
              &nbsp; save
            </Button>
          </Can>
        </CardActions>
      </div>
    </Card>
  );
};

export default Post;
