import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import axios from '../services/axios/axios-forum';

import Post from '../components/UI/Post/Post';

const all = props => {
  const { allData } = props;
  const [data, setData] = useState(allData);
  const [updatePost, setUpdatePost] = useState(false);

  const posts = data.map(post => (
    <Post
      key={post.hash_id}
      post={{ ...post, __type: 'Post' }}
      comments={post.comments_count}
      createdAt={post.created_at}
      jetId={post.jet_id}
      postId={post.hash_id}
      title={post.title}
      updatedAt={post.updated_at}
      username={post.voter_id}
      score={post.cached_votes_score}
      setUpdatePost={setUpdatePost}
    />
  ));

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
      const fetchAll = async () => {
        const allPosts = await axios.get('/api/all');

        updateCurrent(allPosts.data);

        if (updatePost) {
          setUpdatePost(false);
        }
      };

      if (myPreviousState && !_.isEqual(myPreviousState, current)) {
        setData(current);
      }

      fetchAll();
    }, [updatePost]);
  };

  useDeepComparison(allData);

  return data.length > 0 ? posts : <p>No posts found.</p>;
};

all.getInitialProps = async () => {
  const url = '/api/all';
  const allPosts = await axios.get(url);

  return { allData: allPosts.data };
};

export default all;
