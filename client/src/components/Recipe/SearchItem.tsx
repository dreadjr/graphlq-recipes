import * as React from 'react';
import { IRecipe } from '../../interfaces/Recipe/recipe.interface';

import { Typography } from '@material-ui/core';

import { Link } from 'react-router-dom';

export default (props: IRecipe) => (
  <li key={props._id} style={{ listStyle: 'none' }}>
    <Link to={`/recipe/${props._id}`}>
      <Typography variant="display2">{props.name}</Typography>
    </Link>
    <Typography
      variant="display1"
      style={{ textAlign: 'center', marginTop: '1rem' }}
    >
      Likes:
      {props.likes}
    </Typography>
  </li>
);
