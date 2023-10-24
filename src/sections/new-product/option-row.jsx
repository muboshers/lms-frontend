import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Box, Stack, IconButton, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';

function OptionRow() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'option',
  });

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Variant</Typography>

      {fields?.map((field, index) => (
        <Box key={field.id}>
          <Stack gap={1} flexDirection="row">
            <RHFTextField name={`option.${index}.name`} label="Variant Nomi" />
            <RHFTextField name={`option.${index}.value`} label="Variant qiymati" />
          </Stack>
          <Stack marginTop={1} flexDirection="row" alignItems="center" justifyContent="flex-end">
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

export default OptionRow;
