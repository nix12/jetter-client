import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from '../../../services/axios/axios-forum';

const useStyles = makeStyles({
  center: {
    textAlign: 'center'
  }
});

const Trending = props => {
  const { setLoading } = props;
  const classes = useStyles();
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const jets = await axios.get('/api/jets');

      setList(jets.data.jets);
    };

    fetchTrending();
    setLoading(false);
  }, []);

  const jets = list.map((text, index) => {
    while (index <= 5) {
      return (
        <div key={text.id} className={classes.center}>
          <Link href="/j/[jetId]" as={`/j/${text.name}`}>
            <Button>{text.name}</Button>
          </Link>
        </div>
      );
    }
  });

  return (
    <Card>
      <h4 className={classes.center}>Trending</h4>
      <Divider />
      {jets}
    </Card>
  );
};

export default Trending;
