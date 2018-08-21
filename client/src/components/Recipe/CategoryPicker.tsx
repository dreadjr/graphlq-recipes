import * as React from 'react';
import { InputLabel, Select } from '@material-ui/core';

import { CategoryItem } from '../StyledComponents/Form/AddRecipe/AddRecipe';
import { Toggle } from '../Toggle/Toggle';

interface CategoryPickerProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export default (props: CategoryPickerProps) => (
  <Toggle>
    {({ on, onToggle }) => {
      return (
        <>
          <InputLabel htmlFor="select-category">Category</InputLabel>
          <Select
            onClose={onToggle}
            onOpen={onToggle}
            open={on}
            value={props.value}
            inputProps={{
              name: 'category',
              id: 'select-category'
            }}
            onChange={props.onChange}
            style={{ width: '30rem' }}
          >
            <CategoryItem value={'Breakfast'} onChange={props.onChange}>
              Breakfast
            </CategoryItem>
            <CategoryItem value={'Lunch'}>Lunch</CategoryItem>
            <CategoryItem value={'Dinner'}>Dinner</CategoryItem>
            <CategoryItem value={'Snack'}>Snack</CategoryItem>
          </Select>
        </>
      );
    }}
  </Toggle>
);
