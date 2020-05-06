import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import axios from '../services/axios/axios-forum';

import Text from '../components/UI/Text/Text';
import LinkUI from '../components/UI/Link/Link';

const all = props => {
  const { allData } = props;

  const [data, setData] = useState(allData);
  const [updateText, setUpdateText] = useState(false);

  const posts = data.map(post =>
    post.uri ? (
      <LinkUI
        key={post.hash_id}
        link={{ __type: 'Link', ...post }}
        comments={post.comments_count}
        createdAt={post.created_at}
        jetId={post.jet_id}
        linkId={post.hash_id}
        title={post.title}
        uri={post.uri}
        updatedAt={post.updated_at}
        username={post.voter_id}
        score={post.cached_votes_score}
        setUpdateText={setUpdateText}
      />
    ) : (
      <Text
        key={post.hash_id}
        text={{ ...post, __type: 'Text' }}
        comments={post.comments_count}
        createdAt={post.created_at}
        jetId={post.jet_id}
        textId={post.hash_id}
        title={post.title}
        uri={post.uri}
        updatedAt={post.updated_at}
        username={post.voter_id}
        score={post.cached_votes_score}
        setUpdateText={setUpdateText}
      />
    )
  );

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
        const allTexts = await axios.get('/api/all');

        updateCurrent(allTexts.data);

        if (updateText) {
          setUpdateText(false);
        }
      };

      if (myPreviousState && !_.isEqual(myPreviousState, current)) {
        setData(current);
      }

      fetchAll();
    }, [updateText]);
  };

  useDeepComparison(allData);

  return data.length > 0 ? posts : <p>No posts found.</p>;
};

all.getInitialProps = async () => {
  const url = '/api/all';
  const allTexts = await axios.get(url);

  return { allData: allTexts.data };
};

export default all;
