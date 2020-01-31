import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { createJet } from '../../../store/actions/index';

const newJet = props => {
  const { error } = props;

  let errorMessage = null;

  if (error) {
    Object.entries(error).map(([key, value]) => {
      const field = key.charAt(0).toUpperCase() + key.slice(1);

      errorMessage = (
        <div>
          <span>{field}</span>
          <span>{value}</span>
        </div>
      );

      return errorMessage;
    });
  }

  return (
    <div>
      <h1>New Jet</h1>

      <div>
        {errorMessage}
        <form onSubmit={submitHandler}>
          {formOutput}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default newJet;
