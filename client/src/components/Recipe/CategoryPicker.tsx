import * as React from 'react';
import { InputLabel, Select } from '@material-ui/core';

import { CategoryItem } from '../StyledComponents/Form/AddRecipe/AddRecipe';
import { Toggle } from '../Toggle/Toggle';

import { CategoryPickerProps } from '../../interfaces/Recipe/categoryPicker.interface';

export default (props: CategoryPickerProps) => (
  <Toggle>
    {({ on, onToggle }) => {
      return (
        <>
          <InputLabel>Category</InputLabel>
          <Select
            onClose={onToggle}
            onOpen={onToggle}
            open={on}
            value={props.value}
            onChange={props.onChange}
            style={{ width: '30rem' }}
          >
            <CategoryItem value={'Breakfast'}>Breakfast</CategoryItem>
            <CategoryItem value={'Lunch'}>Lunch</CategoryItem>
            <CategoryItem value={'Dinner'}>Dinner</CategoryItem>
            <CategoryItem value={'Snack'}>Snack</CategoryItem>
          </Select>
        </>
      );
    }}
  </Toggle>
);
