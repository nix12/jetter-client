import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import axios from '../../../services/axios/axios-forum';

import Post from '../../../components/UI/Post/Post';

const jet = props => {
  const { jetData } = props;
  const [data, setData] = useState(jetData);
  const [update, setUpdatePosts] = useState(false);
  const router = useRouter();
  console.log('ROUTER', router.query);
  const { jetId } = router.query;

  const posts = data.map(post => (
    <Post
      key={post.hash_id}
      body={post.body}
      comments={post.comments_count}
      createdAt={post.created_at}
      hashId={post.hash_id}
      jetId={post.jet_id}
      title={post.title}
      updatedAt={post.updated_at}
      username={post.voter_id}
      score={post.cached_votes_score}
      setUpdatePosts={setUpdatePosts}
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
      const fetchJet = async () => {
        const jetData = await axios.get(`/api/jets/${jetId}`);

        updateCurrent(jetData.data);

        if (update) {
          setUpdatePosts(false);
        }
      };

      if (myPreviousState && !_.isEqual(myPreviousState, current)) {
        setData(current);
      }

      fetchJet();
    }, [update]);
  };

  useDeepComparison(jetData);

  return data.length > 0 ? posts : <p>No posts found.</p>;
};

jet.getInitialProps = async ({ query }) => {
  console.log('QUERY', query);
  const { jetId } = query;
  const url = `/api/jets/${jetId}`;
  const jet = await axios.get(url);

  return { jetData: jet.data };
};

export default jet;
