import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';

import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Text from '../../../../../components/UI/Text/Text';
import Comment from '../../../../../components/UI/Comment/Comment';
import CommentForm from '../../../../../components/Forms/Comment';

import axios from '../../../../../services/axios/axios-forum';

const Show = props => {
  const { textData } = props;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(textData);
  const [updateText, setUpdateText] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const [toggleReply, setToggleReply] = useState(true);
  const router = useRouter();
  const { jetId, textId } = router.query;
  let comments;

  const renderComment = comment => {
    return comment.map(child => (
      <Comment
        key={child.hash_id}
        comment={{ __type: 'Comment', ...child }}
        body={child.body}
        comments={child.comments_count}
        createdAt={child.created_at}
        commentId={child.hash_id}
        jetId={child.jet_id}
        updatedAt={child.updated_at}
        username={child.voter_id}
        score={child.cached_votes_score}
        nestedComments={renderComment(child.children)}
        setUpdateComment={setUpdateComment}
      />
    ));
  };

  if (loading) {
    comments = <CircularProgress />;
  } else if (!_.isEmpty(data.comments)) {
    comments = data.comments.map(comment => renderComment(comment));
  } else {
    comments = <p>No comments found.</p>;
  }

  // const usePrevious = value => {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // };

  // const useDeepComparison = initialData => {
  //   const myPreviousState = usePrevious(initialData);
  //   const [current, updateCurrent] = useState([]);

  useEffect(() => {
    const fetchText = async () => {
      const textData = await axios.get(`/api/jets/${jetId}/texts/${textId}`);

      // updateCurrent(textData.data);
      setData(textData.data);
      if (updateComment) {
        setUpdateComment(false);
      }
    };

    // if (myPreviousState && !_.isEqual(myPreviousState, current)) {
    //   setData(current);
    // }

    // linkId ? fetchLink() : fetchText();

    fetchText();
    setLoading(false);
  }, [updateComment, updateText, textId]);
  // };

  // useDeepComparison(textData);

  return (
    <div>
      <Text
        text={{ __type: 'Text', ...data.text }}
        body={data.text.body}
        comments={data.text.comments_count}
        createdAt={data.text.created_at}
        jetId={data.text.jet_id}
        textId={data.text.hash_id}
        title={data.text.title}
        uri={data.text.uri}
        updatedAt={data.text.updated_at}
        username={data.text.voter_id}
        score={data.text.cached_votes_score}
        setUpdateText={setUpdateText}
      />
      <CommentForm
        rows="15"
        cols="65"
        setToggle={setToggleReply}
        toggle={toggleReply}
        setUpdateComment={setUpdateComment}
      />
      {comments}
    </div>
  );
};

Show.getInitialProps = async ({ query }) => {
  const { jetId, textId } = query;
  const url = `/api/jets/${jetId}/texts/${textId}`;
  const text = await axios.get(url);

  return { textData: text.data };
};

export default Show;
