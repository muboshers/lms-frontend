/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import PropsTypes from "prop-types";
import { uz } from "date-fns/locale";
import { Controller, useFormContext } from "react-hook-form";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

RHFDatePicker.propTypes = {
  name: PropsTypes.string,
  label: PropsTypes.string,
  other: PropsTypes.any,
};

export default function RHFDatePicker({ name, label, other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider adapterLocale={uz} dateAdapter={AdapterDateFns}>
          <DatePicker
            {...field}
            inputFormat="dd.mm.YYYY"
            label={label}
            slotProps={{
              textField: {
                helperText: error?.message,
                error: !!error,
                fullWidth: true,
              },
            }}
            {...other}
          />
        </LocalizationProvider>
      )}
    />
  );
}
