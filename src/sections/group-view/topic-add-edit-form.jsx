import * as yup from 'yup';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {LoadingButton} from '@mui/lab';
import {Stack, Dialog, DialogTitle, DialogContent} from '@mui/material';

import {WEEK_DAYS} from '../../contants';
import TeacherSearch from './teacher-search';
import FormProvider from '../../components/hook-form/RHFFormProvider';
import {useCreateTopicMutation, useUpdateTopicMutation} from '../../api/topic-api-req';
import {
    RHFTextField,
    RHFDatePicker,
    RHFAutocomplete,
    RHFNumberFormatField,
} from '../../components/hook-form';

export function TopicAddEditForm({groupId, editData, open, onClose}) {
    const [topicCreate, topicCreateRes] = useCreateTopicMutation();

    const [topicUpdate, topicUpdateRes] = useUpdateTopicMutation();

    const schema = yup.object().shape({
        teacher_id: yup.string().required("O'qituvchini belgilash talab etiladi"),
        price: yup.string().required("O'qituvchini narhi talab etiladi har bir o'quvchi uchun"),
        percentage: yup.string().required("O'qituvchining % foizi talab etiladi)"),
        week_days: yup.array().min(1).required('Hafta kunlari talab etiladi'),
        during_month: yup
            .string()
            .max(2, 'Siz kiritgan muddat xato!')
            .required('Davomiylik muddati talab etiladi (oy hisobida)'),
        start_date: yup.string().required('Boshlanish sanasi talab etiladi'),
        time_of_day: yup.string().required('Soatini yozish talab etiladi'),
    });

    const defaultValues = {
        teacher_id: '',
        price: '',
        percentage: '0',
        during_month: '',
        start_date: new Date(),
        week_days: [],
        time_of_day: '',
    };

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    const {handleSubmit, reset, setValue} = methods;

    const dialogClose = () => {
        reset(defaultValues);
        onClose();
    };

    const createTopic = (data) => {
        topicCreate({
            ...data,
            price: parseInt(data.price, 10),
            percentage: parseInt(data.percentage, 10),
            group_id: groupId,
        })
            .unwrap()
            .then((res) => {
                toast.success("Topik mufaqqiyatli qo'shildi");
                dialogClose();
            });
    };

    const updateTopic = (data) => {
        topicUpdate({
            id: editData?._id,
            body: {
                ...data,
                price: parseInt(data.price, 10),
                percentage: parseInt(data.percentage, 10),
                group_id: groupId,
            },
        })
            .unwrap()
            .then((res) => {
                toast.success("Topik mufaqqiyatli yangilandi");
                dialogClose();
            });
    };

    const onSubmit = (topicData) => {
        // eslint-disable-next-line no-unused-expressions
        editData?._id ? updateTopic(topicData) : createTopic(topicData);
    };

    useEffect(() => {
        if (editData) {
            reset({
                teacher_id: editData?.teacher_id?._id,
                price: editData?.price,
                percentage: `${editData?.percentage}`,
                during_month: editData?.during_month,
                start_date: new Date(editData?.start_date),
                week_days: editData?.week_days,
                time_of_day: editData?.time_of_day,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editData]);

    return (
        <Dialog open={open} onClose={dialogClose}>
            <DialogTitle>Topik ma&apos;lumotlari</DialogTitle>
            <DialogContent>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack
                        gap={2}
                        sx={{
                            width: '100vw',
                            maxWidth: '500px',
                            padding: '1rem 0',
                        }}
                    >
                        <RHFNumberFormatField
                            name="price"
                            label="Narhini yozing"
                            helperText="Har bir o'quvchi uchun (oylik)"
                            type="Numeric"
                            thousandSeparator=","
                        />
                        <RHFNumberFormatField
                            name="percentage"
                            label="Foizni yozing"
                            helperText="O'qituvchini fozini"
                            type="Pattarn"
                            format="###"
                            allowEmptyFormatting
                        />
                        <TeacherSearch
                            name="teacher_id"
                            defaultValue={editData?.teacher_id?.name ?? ''}
                            setValue={setValue}
                        />
                        <RHFTextField
                            name="during_month"
                            inputProps={{
                                maxLength: 2,
                            }}
                            helperText="O'quv muddati davomiyligi oy hisabida"
                        />
                        <RHFAutocomplete
                            multiple
                            fullWidth
                            name="week_days"
                            options={WEEK_DAYS.map((option) => option.value)}
                            label="Hafta kunlarini tanlang"
                        />
                        <RHFDatePicker name="start_date"/>

                        <RHFTextField
                            name="time_of_day"
                            inputProps={{
                                maxLength: 5,
                            }}
                            helperText="O'quv dasturining soati va daqiqasini yozing (kunlik)"
                        />
                    </Stack>

                    <LoadingButton
                        loading={topicCreateRes.isLoading || topicUpdateRes.isLoading}
                        fullWidth
                        type="submit"
                        sx={{marginTop: 1}}
                        variant="contained"
                        color="inherit"
                        size="large"
                    >
                        {editData?._id ? 'Yangilash' : "Qo'shish"}
                    </LoadingButton>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}

TopicAddEditForm.propTypes = {
    groupId: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    editData: PropTypes.any,
};
