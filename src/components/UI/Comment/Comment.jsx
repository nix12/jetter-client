import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Moment from 'moment';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ArrowUp from '@material-ui/icons/ExpandLess';
import ArrowDown from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

import CommentForm from '../../Forms/Comment';
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
  }
});

const Comment = props => {
  const {
    comment,
    username,
    createdAt,
    score,
    jetId,
    textId,
    linkId,
    commentId,
    body,
    setUpdateComment,
    nestedComments
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

  const classes = useStyles();
  const now = new Moment();
  const created = new Moment(createdAt);
  const duration = Moment.duration(created.diff(now)).humanize();
  const cookies = new Cookies();
  const token = cookies.get('token');
  let userInfo;
  if (token) {
    userInfo = jwtDecode(token);
  }

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

  const dispatch = useDispatch();
  const router = useRouter();
  const removeComment = () => {
    dispatch(deleteComment(jetId, textId, linkId, commentId)).then(response => {
      if (response.status === 204) {
        router.reload();
      }
    });
  };

  return (
    <div style={{ marginLeft: '25px', marginTop: '10px' }}>
      <div>
        <Card className={classes.card}>
          <div className={classes.votes}>
            <ArrowUp
              onClick={
                !down
                  ? () => upvoted(jetId, textId, commentId)
                  : () => switchVote(jetId, textId, commentId)
              }
              className={up ? classes.voted : ''}
            />
            <ArrowDown
              onClick={
                !up
                  ? () => downvoted(jetId, textId, commentId)
                  : () => switchVote(jetId, textId, commentId)
              }
              className={down ? classes.voted : ''}
            />
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