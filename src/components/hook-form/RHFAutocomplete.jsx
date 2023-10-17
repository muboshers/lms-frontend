import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import { TextField, Autocomplete } from '@mui/material';

function RHFAutocomplete({ name, label, options, helperText, isAutoFocus = false, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: 'this field is requried',
      }}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <>
            <Autocomplete
              value={value ? options?.find((option) => value === option.id) ?? null : null}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.id : null);
              }}
              options={options ?? []}
              renderInput={(params) => (
                <TextField
                  autoFocus={isAutoFocus}
                  {...params}
                  label={label}
                  inputRef={ref}
                  helperText={helperText}
                />
              )}
              {...other}
            />
            {error ? <span style={{ color: 'red' }}>{error.message}</span> : null}
          </>
        );
      }}
    />
  );
}

RHFAutocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  helperText: PropTypes.node,
  options: PropTypes.any,
  onChange: PropTypes.func,
  isAutoFocus: PropTypes.bool,
};

export default RHFAutocomplete;
