import React from 'react';
import PropTypes from 'prop-types';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Box, Typography } from '@mui/material';

import ColorItem from './color-item';

function ColorRow({ colors }) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'color',
  });
  return (
    <Box>
      <Typography variant="h5">Rangni tanlash</Typography>
      {fields?.map((field, index) => (
        <ColorItem colors={colors} key={field.id} append={append} remove={remove} index={index} />
      ))}
    </Box>
  );
}

ColorRow.propTypes = {
  colors: PropTypes.array,
};

export default ColorRow;
