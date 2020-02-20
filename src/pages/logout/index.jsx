import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/index';

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(logout())
      .then(response => {
        if (response.status === 200) {
          router.push('/login');
        }
      })
      .catch(router.push('/'));
  }, []);

  return null;
};

export default Logout;
