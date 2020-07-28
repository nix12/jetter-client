import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

import Can from '../../components/Permissions/Can';

import axios from '../../services/axios/axios-forum';
import redirectTo from '../../shared/redirectTo';

const SavedPosts = props => {
  const { value, index } = props;
  const user = useSelector(state => state.auth.currentUser);

  const [data, setData] = useState([]);
  const [updatePost, setUpdatePost] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);

  const userId = useSelector(state => state.auth.currentUser.userId);
  const username = useSelector(state => state.auth.currentUser.username);

  useEffect(() => {
    const fetchPostHistory = async () => {
      const postHistory = await axios.get(
        `/api/voters/${username}/saved_posts`
      );

      setData(postHistory.data.history);
    };

    if (username) {
      fetchPostHistory();
    }
  }, [username, updateComment, updatePost]);

  return (
    value === index && (
      <div>
        <Can I="read" this={{ __type: 'User', id: user.userId }}>
          <h1>Saved Posts</h1>
        </Can>
      </div>
    )
  );
};

SavedPosts.getInitialProps = async ({ res, isServer }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  if (!token && !isServer) {
    redirectTo('/login');
  }

  return {};
};

export default SavedPosts;
