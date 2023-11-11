import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cleave from 'cleave.js/react';
import React, {memo, forwardRef} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import {TextField} from '@mui/material';

// eslint-disable-next-line no-unused-vars
const CleaveInput = forwardRef((props, _) => {
    const {inputRef, ...other} = props;
    return <Cleave ref={inputRef} {...other} />;
});

CleaveInput.propTypes = {
    inputRef: PropTypes.any,
};

const RHFCleaveField = ({name, options, sx = {}, helperText, ...other}) => {
    const {control} = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => (
                <TextField
                    fullWidth
                    {...field}
                    value={field.value ?? ''}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    InputProps={{
                        inputComponent: CleaveInput,
                        inputProps: {
                            options,
                        },
                    }}
                    {...other}
                />
            )}
        />
    );
};

RHFCleaveField.propTypes = {
    name: PropTypes.string,
    helperText: PropTypes.string,
    options: PropTypes.object,
    sx: PropTypes.object
};

export default memo(RHFCleaveField);
