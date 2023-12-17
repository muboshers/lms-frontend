import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import React, {useEffect} from 'react';

import {LoadingButton} from '@mui/lab';
import {Stack, Dialog, DialogTitle, DialogContent} from '@mui/material';

import FormProvider from 'src/components/hook-form/RHFFormProvider';
import {RHFTextField, RHFNumberFormatField} from 'src/components/hook-form';

import {defaultValues, usePupilsForm} from './form';
import {useCreatePupilsMutation, useUpdatePupilsMutation} from "../../../api/pupils-api-req";

PupilsAddEditModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    pupilsData: PropTypes.any,
    setPupilsData: PropTypes.func
};

export default function PupilsAddEditModal({open, onClose, pupilsData, setPupilsData}) {
    const [createPupils, createPupilsRes] = useCreatePupilsMutation();
    const [updatePupils, updatePupilsRes] = useUpdatePupilsMutation();

    const methods = usePupilsForm();

    const {handleSubmit, reset} = methods;

    const modalClose = () => {
        onClose()
        reset(defaultValues)
        setPupilsData(null)
    }


    const onSubmit = (data) => {
        if (pupilsData?._id) {
            const promise = updatePupils({id: pupilsData?._id, ...data})
                .unwrap()
                .then(() => {
                    modalClose();
                })

            toast.promise(promise, {
                loading: `${pupilsData?.name} ma'lumotlari o'zgartirilmoqda...`,
                success: `${pupilsData?.name} ma'lumotlari mufaqqiyatli yangilandi.`
            })
        } else {
            createPupils(data)
                .unwrap()
                .then(() => {
                    toast.success("O'quvchi mufaqqiyatli qo'shildi");
                    modalClose();
                });
        }
    };


    useEffect(() => {
        if (pupilsData?._id) {
            reset({
                ...pupilsData,
            })
        }
        // eslint-disable-next-line
    }, [pupilsData, reset])

    return (
        <Dialog open={open} onClose={modalClose}>
            <DialogTitle>O&apos;quvchi ma&apos;lumotlari</DialogTitle>
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
                        <RHFTextField name="name" label="Ismi va familiyasi"/>
                        <RHFTextField name="age" label="O'quvchining yoshi"/>
                        <RHFNumberFormatField
                            name="parent_contact_information"
                            label="Ota onasining telefon raqami"
                            format="+### ## ### ## ##"
                            allowEmptyFormatting
                            mask="_"
                        />
                    </Stack>
                    <LoadingButton
                        fullWidth
                        type="submit"
                        loading={createPupilsRes.isLoading || updatePupilsRes.isLoading}
                        sx={{marginTop: 1}}
                        variant="contained"
                        color="inherit"
                        size="large"
                    >
                        {pupilsData?._id ? "Yangilash" : "Qo'shish"}
                    </LoadingButton>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}
