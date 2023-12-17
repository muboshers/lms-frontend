import React from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';

import {Box, Stack, IconButton} from '@mui/material';

import {WEEK_DAYS} from 'src/contants';

import Iconify from 'src/components/iconify';
import {RHFTextField, RHFDatePicker, RHFAutocomplete, RHFNumberFormatField,} from 'src/components/hook-form';

import TeacherSearch from './teacher-search';

export default function TopicRow() {
    const {control, setValue, watch} = useFormContext();

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'topics',
    });


    const handleAppendRow = () =>
        append({
            teacher_id: '',
            price: '',
            percentage: '0',
            during_month: '',
            start_date: new Date(),
            week_days: [],
            time_of_day: '',
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
                        <RHFNumberFormatField
                            name={`topics.${index}.price`}
                            label="Narhini yozing"
                            helperText="Har bir o'quvchi uchun (oylik)"
                            type="Numeric"
                            allowLeadingZeros
                            thousandSeparator=","
                        />
                        <RHFNumberFormatField
                            name={`topics.${index}.percentage`}
                            label="Foizni yozing"
                            helperText="O'qituvchini fozini"
                            type="Pattarn"
                            format="###"
                            allowEmptyFormatting
                        />
                        <TeacherSearch name={`topics.${index}.teacher_id`} watch={watch} setValue={setValue}/>
                        <RHFTextField
                            name={`topics.${index}.during_month`}
                            inputProps={{
                                maxLength: 2,
                            }}
                            helperText="O'quv muddati davomiyligi oy hisabida"
                        />
                    </Stack>

                    <Stack flexDirection="row" gap={1} marginTop={1}>
                        <RHFAutocomplete
                            multiple
                            fullWidth
                            name={`topics.${index}.week_days`}
                            options={WEEK_DAYS.map((option) => option.value)}
                            label="Hafta kunlarini tanlang"
                        />
                        <RHFDatePicker name={`topics.${index}.start_date`}/>

                        <RHFTextField
                            name={`topics.${index}.time_of_day`}
                            inputProps={{
                                maxLength: 5,
                            }}
                            helperText="O'quv dasturining soati va daqiqasini yozing (kunlik)"
                        />
                    </Stack>

                    <Stack flexDirection="row" justifyContent="flex-end">
                        <IconButton
                            onClick={handleAppendRow}
                            type="button"
                            sx={{
                                color: 'success.main',
                            }}
                        >
                            <Iconify icon="mdi:add"/>
                        </IconButton>
                        {index > 0 && (
                            <IconButton
                                onClick={handleRemoveField}
                                type="button"
                                sx={{
                                    color: 'error.main',
                                }}
                            >
                                <Iconify icon="fluent:delete-12-regular"/>
                            </IconButton>
                        )}
                    </Stack>
                </Box>
            ))}
        </Box>
    );
}
