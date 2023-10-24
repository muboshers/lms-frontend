/* eslint-disable react/prop-types */
// form
import { Controller, useFormContext } from 'react-hook-form';

// @mui
import { TextField, Autocomplete } from '@mui/material';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
export default function RHFAutocomplete({
  name,
  label,
  helperText,
  valueKey,
  setSearch,
  ...other
}) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(event, newValue) => {
            setValue(name, newValue, { shouldValidate: true });
          }}
          renderInput={(params) => (
            <TextField
              label={label}
              error={!!error}
              helperText={error ? error?.message : helperText}
              onChange={(e) => {
                if (setSearch) {
                  setSearch(e.target.value);
                }
              }}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
