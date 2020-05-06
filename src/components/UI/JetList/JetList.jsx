import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from '../../../services/axios/axios-forum';

const useStyles = makeStyles({
  center: {
    textAlign: 'center'
  }
});

const JetList = props => {
  const { setLoading } = props;
  const classes = useStyles();
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchJetList = async () => {
      const jets = await axios.get('/api/jets');

      setList(jets.data);
    };

    fetchJetList();
    setLoading(false);
  }, []);

  const jets = list.map((text, index) => {
    const separator = index <= 6 ? <span>|</span> : null;

    while (index <= 8) {
      return (
        <div key={text.id} className={classes.center}>
          <Link href="/j/[jetId]" as={`/j/${text.name}`}>
            <Button>{text.name}</Button>
          </Link>
          {separator}
        </div>
      );
    }
  });

  return jets;
};

export default JetList;
