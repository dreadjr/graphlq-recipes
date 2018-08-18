import * as React from 'react';

import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';
import { Typography } from '@material-ui/core';

import { Link } from 'react-router-dom';

export default (props: any) => (
  <ComponentWrapper>
    <Link to={`/recipe/${props._id}`}>
      <Typography>{props.name}</Typography>
    </Link>
    <Typography>{props.category}</Typography>
  </ComponentWrapper>
);
