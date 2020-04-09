import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';

import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import LinkUI from '../../../../../components/UI/Link/Link';
import Comment from '../../../../../components/UI/Comment/Comment';
import CommentForm from '../../../../../components/Forms/Comment';

import axios from '../../../../../services/axios/axios-forum';

const Show = props => {
  const { linkData } = props;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(linkData);
  const [updateLink, setUpdateLink] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const [toggleReply, setToggleReply] = useState(true);
  const router = useRouter();
  const { jetId, linkId } = router.query;
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
    const fetchLink = async () => {
      const linkData = await axios.get(`/api/jets/${jetId}/links/${linkId}`);

      // updateCurrent(postData.data);
      setData(linkData.data);
      if (updateComment) {
        setUpdateComment(false);
      }
    };

    // if (myPreviousState && !_.isEqual(myPreviousState, current)) {
    //   setData(current);
    // }

    fetchLink();
    setLoading(false);
  }, [updateComment, updateLink, linkId]);
  // };

  // useDeepComparison(postData);
  return (
    <div>
      <LinkUI
        link={{ __type: 'Link', ...data.link }}
        body={data.link.body}
        comments={data.link.comments_count}
        createdAt={data.link.created_at}
        jetId={data.link.jet_id}
        linkId={data.link.hash_id}
        title={data.link.title}
        uri={data.link.uri}
        updatedAt={data.link.updated_at}
        username={data.link.voter_id}
        score={data.link.cached_votes_score}
        setUpdatePost={setUpdateLink}
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
  const { jetId, linkId } = query;
  const url = `/api/jets/${jetId}/links/${linkId}`;

  const link = await axios.get(url);

  return { linkData: link.data };
};

export default Show;
