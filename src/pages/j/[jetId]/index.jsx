import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';

import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Post from '../../../components/UI/Post/Post';
import LinkUI from '../../../components/UI/Link/Link';

import axios from '../../../services/axios/axios-forum';

const Jet = props => {
  const { jetData } = props;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(jetData);
  const [updatePost, setUpdatePost] = useState(false);
  const router = useRouter();
  const { jetId } = router.query;
  let posts;

  if (loading) {
    posts = <CircularProgress />;
  } else if (!_.isEmpty(data)) {
    posts = data.map(post =>
      post.uri ? (
        <LinkUI
          key={post.hash_id}
          link={{ __type: 'Link', ...post }}
          comments={post.comments_count}
          createdAt={post.created_at}
          linkId={post.hash_id}
          jetId={post.jet_id}
          title={post.title}
          body={post.body}
          uri={post.uri}
          updatedAt={post.updated_at}
          username={post.voter_id}
          score={post.cached_votes_score}
          setUpdatePost={setUpdatePost}
        />
      ) : (
        <Post
          key={post.hash_id}
          post={{ __type: 'Post', ...post }}
          comments={post.comments_count}
          createdAt={post.created_at}
          postId={post.hash_id}
          jetId={post.jet_id}
          title={post.title}
          body={post.body}
          uri={post.uri}
          updatedAt={post.updated_at}
          username={post.voter_id}
          score={post.cached_votes_score}
          setUpdatePost={setUpdatePost}
        />
      )
    );
  } else {
    posts = <p>No posts found.</p>;
  }

  const usePrevious = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const useDeepComparison = initialData => {
    const myPreviousState = usePrevious(initialData);
    const [current, updateCurrent] = useState([]);

    useEffect(() => {
      const fetchJet = async () => {
        const jetPosts = await axios.get(`/api/jets/${jetId}`);

        updateCurrent(jetPosts.data);
        setData(jetPosts.data);

        if (updatePost) {
          setUpdatePost(false);
        }
      };

      if (myPreviousState && !_.isEqual(myPreviousState, current)) {
        setData(current);
      }

      fetchJet();
      setLoading(false);
    }, [updatePost, jetId]);
  };

  useDeepComparison(jetData);

  return posts;
};

Jet.getInitialProps = async ({ query }) => {
  const { jetId } = query;
  const url = `/api/jets/${jetId}`;
  const jetPosts = await axios.get(url);

  return { jetData: jetPosts.data };
};

export default Jet;
