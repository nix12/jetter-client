import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Moment from 'moment';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ArrowUp from '@material-ui/icons/ExpandLess';
import ArrowDown from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

import CommentForm from '../../Forms/Comment';
import RedirectToLogin from '../../Permissions/RedirectToLogin';
import Button from '../Button/Button';
import axios from '../../../services/axios/axios-forum';
import Can from '../../Permissions/Can';
import { deleteComment } from '../../../store/actions';

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
  },
  indentComments: {
    marginLeft: props => `${props.depth * 25}px`,
    marginTop: '10px'
  }
});

const Comment = props => {
  const {
    comment,
    username,
    createdAt,
    score,
    jetId,
    postId,
    commentId,
    body,
    depth,
    setUpdateComment,
    nestedComments,
    style
  } = props;

  const upvote = (jet, text, comment) =>
    axios.put(`/api/jets/${jet}/texts/${text}/comments/${comment}/upvote`);
  const downvote = (jet, text, comment) =>
    axios.put(`/api/jets/${jet}/texts/${text}/comments/${comment}/downvote`);
  const unvote = (jet, text, comment) =>
    axios.put(`/api/jets/${jet}/texts/${text}/comments/${comment}/unvote`);

  const [toggleReply, setToggleReply] = useState(false);
  const [up, setUpvote] = useState(false);
  const [down, setDownvote] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);

  const isLoggedIn = useSelector(state => state.auth.currentUser.isLoggedIn);

  const classes = useStyles({ depth });
  const dispatch = useDispatch();
  const router = useRouter();

  const now = new Moment();
  const created = new Moment(createdAt);
  const duration = Moment.duration(created.diff(now)).humanize();
  const cookies = new Cookies();
  const token = cookies.get('token');

  let userInfo;
  if (token) {
    userInfo = jwtDecode(token);
  }

  const upvotedList = useSelector(state => state.user.voter.votes.upvoted);
  const downvotedList = useSelector(state => state.user.voter.votes.downvoted);

  const upvoted = async (jet, text, comment) => {
    if (up) {
      await unvote(jet, text, comment).then(() => setUpvote(false));
    } else {
      await upvote(jet, text, comment).then(() => setUpvote(true));
    }

    setUpdateComment(true);
  };

  const downvoted = async (jet, text, comment) => {
    if (down) {
      await unvote(jet, text, comment).then(() => setDownvote(false));
    } else {
      await downvote(jet, text, comment).then(() => setDownvote(true));
    }

    setUpdateComment(true);
  };

  const switchVote = async (jet, text, comment) => {
    await unvote(jet, text, comment).then(() => {
      setUpvote(false);
      setDownvote(false);
    });

    if (up) {
      downvoted(jet, text, comment);
    }

    if (down) {
      upvoted(jet, text, comment);
    }

    setUpdateComment(true);
  };

  const removeComment = () => {
    dispatch(deleteComment(jetId, postId, commentId)).then(response => {
      if (response.status === 204) {
        router.reload();
      }
    });
  };

  const checkVoted = list => {
    return _.includes(_.map(list, 'hash_id'), commentId);
  };

  useEffect(() => setUpvote(checkVoted(upvotedList)), [upvotedList]);
  useEffect(() => setDownvote(checkVoted(downvotedList)), [downvotedList]);

  const saveComment = () => {};

  return (
    <div className={classes.indentComments}>
      <div>
        <Card className={classes.card} style={style}>
          <div className={classes.votes}>
            <RedirectToLogin>
              <ArrowUp
                onClick={
                  !down
                    ? () => upvoted(jetId, postId, commentId)
                    : () => switchVote(jetId, postId, commentId)
                }
                className={up ? classes.voted : ''}
              />
            </RedirectToLogin>
            <RedirectToLogin>
              <ArrowDown
                onClick={
                  !up
                    ? () => downvoted(jetId, postId, commentId)
                    : () => switchVote(jetId, postId, commentId)
                }
                className={down ? classes.voted : ''}
              />
            </RedirectToLogin>
          </div>
          {toggleEdit ? (
            <CommentForm
              commentId={commentId}
              setUpdateComment={setUpdateComment}
              rows="5"
              cols="80"
              value={body}
              edit={toggleEdit}
              setEdit={setToggleEdit}
            />
          ) : (
            <div>
              <CardContent>
                <Typography
                  className={classes.info}
                  color="textSecondary"
                  gutterBottom
                >
                  <Link href="/user/[username]" as={`/user/${username}`}>
                    <span className={classes.user}>{username}</span>
                  </Link>
                  &nbsp;
                  {score}
                  &nbsp;points&nbsp;
                  {duration}
                  &nbsp;ago
                </Typography>
                <Divider />
                <Typography variant="h6" component="p">
                  {body}
                </Typography>
              </CardContent>
              <CardActions>
                {isLoggedIn ? (
                  <Button size="small" clicked={() => setToggleReply(true)}>
                    reply
                  </Button>
                ) : null}
                <Can do="update" on={comment}>
                  <Button size="small" clicked={() => setToggleEdit(true)}>
                    edit
                  </Button>
                </Can>
                <Can do="delete" on={comment}>
                  <Button size="small" clicked={() => removeComment()}>
                    delete
                  </Button>
                </Can>
                <Can do="create" on={comment}>
                  <Button size="small" onClick={() => saveComment}>
                    save
                  </Button>
                </Can>
              </CardActions>
            </div>
          )}
        </Card>
        <CommentForm
          commentId={commentId}
          setUpdateComment={setUpdateComment}
          toggle={toggleReply}
          setToggle={setToggleReply}
          rows="10"
          cols="50"
        />
      </div>
      {nestedComments}
    </div>
  );
};

export default Comment;
