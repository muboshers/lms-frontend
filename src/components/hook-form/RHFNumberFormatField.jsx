import PropTypes from 'prop-types';
import React, {memo,} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import {PatternFormat, NumericFormat} from "react-number-format";

import {TextField} from '@mui/material';


const RHFNumberFormatField = ({
                                  name, sx = {}, helperText, type = 'Numeric', ...other
                              }) => {
        const {control} = useFormContext();

        return (
            <Controller
                name={name}
                control={control}
                render={({field, fieldState}) => {
                    if (type === "Numeric") {
                        return (
                            <NumericFormat
                                onValueChange={(event) => field.onChange(event.value)}
                                onBlur={field.onBlur}
                                name={field.name}
                                disabled={field.disabled}
                                value={field.value ?? ''}
                                customInput={TextField}
                                autoComplete="off"
                                fullWidth
                                error={!!fieldState.error?.message}
                                helperText={fieldState.error?.message}
                                allowLeadingZeros
                                {...other}/>
                        )
                    }
                    return (
                        <PatternFormat
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            disabled={field.disabled}
                            value={field.value ?? ''}
                            customInput={TextField}
                            autoComplete="off"
                            fullWidth
                            error={!!fieldState.error?.message}
                            helperText={fieldState.error?.message}
                            {...other}
                        />
                    )
                }
                }
            />
        );
    }
;

RHFNumberFormatField.propTypes = {
    name: PropTypes.string,
    helperText: PropTypes.string,
    options: PropTypes.object,
    sx: PropTypes.object,
    type: PropTypes.any
};

export default memo(RHFNumberFormatField);
