import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox, FormGroup, FormLabel, FormControl, FormHelperText, FormControlLabel } from '@mui/material';

export const RHFCheckbox = memo(({ name, label, ...other }) => {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      label={label}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value} />}
        />
      }
      {...other}
    />
  );
});

RHFCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export const RHFMultiCheckbox = memo(({ row, name, label, options, valueKey, optionKey, helperText, ...other }) => {
  const { control } = useFormContext();

  const getSelected = (selectedItems, item) =>
    selectedItems.includes(item) ? selectedItems.filter((value) => value !== item) : [...selectedItems, item];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset" fullWidth>
          {label && (
            <FormLabel component="legend" sx={{ typography: 'body2' }}>
              {label}
            </FormLabel>
          )}

          <FormGroup
            sx={{
              ...(row && {
                flexDirection: 'row',
              }),
            }}
          >
            {options?.map((option) => (
              <FormControlLabel
                key={option?.id}
                sx={{
                  ...(row && {
                    width: '180px',
                  }),
                }}
                control={
                  <Checkbox
                    checked={field.value.includes(option[valueKey])}
                    onChange={() => field.onChange(getSelected(field.value, option[valueKey]))}
                  />
                }
                label={option[optionKey]}
                {...other}
              />
            ))}
          </FormGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
});

RHFMultiCheckbox.propTypes = {
  row: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.any,
  valueKey: PropTypes.string,
  optionKey: PropTypes.string,
  spacing: PropTypes.number,
  helperText: PropTypes.node,
};
