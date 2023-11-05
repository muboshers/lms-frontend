import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Box, Stack, IconButton } from "@mui/material";

import { CLEAVE_SUM_CONFIG } from "src/contants";

import Iconify from "src/components/iconify";
import { RHFCleaveField } from "src/components/hook-form";

import TeacherSearch from "./teacher-search";

export default function TopicRow() {
  const { control, setValue } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "topics",
  });

  const handleAppendRow = () =>
    append({
      teacher_id: "",
      price: "",
      percentage: "",
    });

  const handleRemoveField = (index) => remove(index);

  return (
    <Box>
      {fields.map((field, index) => (
        <Box
          key={field.id}
          sx={{
            marginTop: 1,
          }}
        >
          <Stack flexDirection="row" gap={1}>
            <RHFCleaveField
              name={`topics.${index}.price`}
              label="Narhini yozing"
              helperText="Har bir o'quvchi uchun"
              options={CLEAVE_SUM_CONFIG}
            />
            <RHFCleaveField
              name={`topics.${index}.percentage`}
              label="Foizni yozing"
              helperText="O'qituvchini fozini"
            />
            <TeacherSearch
              name={`topics.${index}.teacher_id`}
              setValue={setValue}
            />
          </Stack>

          <Stack flexDirection="row" justifyContent="flex-end">
            <IconButton
              onClick={handleAppendRow}
              type="button"
              sx={{
                color: "success.main",
              }}
            >
              <Iconify icon="mdi:add" />
            </IconButton>
            {index > 0 && (
              <IconButton
                onClick={handleRemoveField}
                type="button"
                sx={{
                  color: "error.main",
                }}
              >
                <Iconify icon="fluent:delete-12-regular" />
              </IconButton>
            )}
          </Stack>
        </Box>
      ))}
    </Box>
  );
}
