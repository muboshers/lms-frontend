import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Box, Stack, IconButton, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

import CategorySearch from './categories-search';

function CategoryRow() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categories',
  });

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Kategoriya</Typography>
      {fields?.map((field, index) => (
        <Box key={field.id}>
          <CategorySearch index={index} />
          <Stack flexDirection="row" alignItems="center" marginTop={1} justifyContent="flex-end">
            <IconButton color="success" onClick={() => append({ categoryId: '' })}>
              <Iconify icon="gala:add" />
            </IconButton>

            {index !== 0 && (
              <IconButton color="error" onClick={() => remove(index)}>
                <Iconify icon="pajamas:remove" />
              </IconButton>
            )}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}

export default CategoryRow;
