import * as React from 'react';

import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';
import { Typography } from '@material-ui/core';

import { Link } from 'react-router-dom';

import { IRecipe } from '../../interfaces/Recipe/recipe.interface';

export default (props: IRecipe) => (
  <ComponentWrapper
    style={{ flexDirection: 'column', alignItems: 'center', height: '5rem' }}
  >
    <Link to={`/recipe/${props._id}`}>
      <Typography variant="display2">{props.name}</Typography>
    </Link>
    <Typography variant="display1" style={{ marginBottom: '1rem' }}>
      {props.category}
    </Typography>
  </ComponentWrapper>
);
