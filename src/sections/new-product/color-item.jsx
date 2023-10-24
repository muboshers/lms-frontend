import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Stack, MenuItem, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';
import { RHFSelect } from 'src/components/hook-form';
import { RHFUpload } from 'src/components/hook-form/RHFUpload';

function ColorItem({ colors, index, append, remove }) {
  const { watch, setValue } = useFormContext();

  const values = watch(`color.${index}`);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue(`color.${index}.images`, [...files, ...newFiles], { shouldValidate: true });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValue, values.images]
  );

  const handleRemoveFile = (inputFile) => {
    const filtered = values.images && values.images?.filter((file) => file !== inputFile);
    setValue(`color.${index}.images`, filtered);
  };

  const handleRemoveAllFiles = () => {
    setValue(`color.${index}.images`, []);
  };

  return (
    <Stack spacing={2} pt={1}>
      <RHFSelect fullWidth name={`color.${index}.colorId`} label="Rangni tanlang">
        {colors?.map((color) => (
          <MenuItem key={color._id} value={color._id}>
            <Stack flexDirection="row" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: '25px',
                  height: '25px',
                  borderRadius: '50%',
                  backgroundColor: color?.color,
                }}
              />
              {color.color}
            </Stack>
          </MenuItem>
        ))}
      </RHFSelect>

      <RHFUpload
        multiple
        thumbnail
        name={`color.${index}.images`}
        onDrop={handleDrop}
        onRemove={handleRemoveFile}
        onRemoveAll={handleRemoveAllFiles}
        onUpload={() => console.log('ON UPLOAD')}
      />

      <Stack flexDirection="row" alignItems="center" marginTop={1} justifyContent="flex-end">
        <IconButton
          color="success"
          onClick={() =>
            append({
              colorId: '',
              images: [],
            })
          }
        >
          <Iconify icon="gala:add" />
        </IconButton>

        {index !== 0 && (
          <IconButton color="error" onClick={() => remove(index)}>
            <Iconify icon="pajamas:remove" />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
}

ColorItem.propTypes = {
  colors: PropTypes.string,
  index: PropTypes.number,
  append: PropTypes.func,
  remove: PropTypes.func,
};

export default ColorItem;
