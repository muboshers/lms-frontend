import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import React, {useEffect} from 'react';

import {LoadingButton} from '@mui/lab';
import {Stack, Dialog, DialogTitle, DialogContent} from '@mui/material';

import {CLEAVE_PHONE_CONFIG} from 'src/contants';
import {useCreateTeacherMutation, useUpdateTeacherMutation} from 'src/api/teacher-api-req';

import FormProvider from 'src/components/hook-form/RHFFormProvider';
import {RHFTextField, RHFCleaveField} from 'src/components/hook-form';

import {defaultValues, useTeacherForm} from './form';

TeacherAddEditModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    teacherData: PropTypes.any,
    setTeacherData: PropTypes.func
};

export default function TeacherAddEditModal({open, onClose, teacherData, setTeacherData}) {
    const [createTeacher, createTeacherRes] = useCreateTeacherMutation();
    const [updateTeacher, updateTeacherRes] = useUpdateTeacherMutation();

    const methods = useTeacherForm();

    const {handleSubmit, reset} = methods;

    const modalClose = () => {
        onClose()
        reset(defaultValues)
        setTeacherData(null)
    }


    const onSubmit = (data) => {
        if (teacherData?._id) {
            const promise = updateTeacher({id: teacherData?._id, ...data})
                .unwrap()
                .then(() => {
                    modalClose();
                })

            toast.promise(promise, {
                loading: `${teacherData?.name} ma'lumotlari o'zgartirilmoqda...`,
                success: `${teacherData?.name} ma'lumotlari mufaqqiyatli yangilandi.`
            })
        } else {
            createTeacher(data)
                .unwrap()
                .then(() => {
                    toast.success("O'qituvchi mufaqqiyatli qo'shildi");
                    modalClose();
                });
        }
    };


    useEffect(() => {
        if (teacherData?._id) {
            reset({...teacherData, phone_number: teacherData?.phone_number.toString()})
        }

        // eslint-disable-next-line
    }, [teacherData])

    return (
        <Dialog open={open} onClose={modalClose}>
            <DialogTitle>Topik ma&apos;lumotlari</DialogTitle>
            <DialogContent>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack
                        gap={4}
                        sx={{
                            width: '100vw',
                            maxWidth: '500px',
                            padding: '1rem 0',
                        }}
                    >
                        <RHFTextField name="name" label="Ismi va Familiyasi"/>
                        <RHFTextField name="age" label="O'qituvchining yoshi"/>
                        <RHFCleaveField
                            name="phone_number"
                            label="O'qituvchining telefon raqami"
                            options={CLEAVE_PHONE_CONFIG}
                        />
                        <RHFTextField name="login" label="O'qituvchi uchin login"/>
                        <RHFTextField name="password" label="O'qituvchi uchun parol" type="password"/>
                    </Stack>
                    <LoadingButton
                        fullWidth
                        type="submit"
                        loading={createTeacherRes.isLoading || updateTeacherRes.isLoading}
                        sx={{marginTop: 1}}
                        variant="contained"
                        color="inherit"
                        size="large"
                    >
                        Qo&apos;shish
                    </LoadingButton>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}
