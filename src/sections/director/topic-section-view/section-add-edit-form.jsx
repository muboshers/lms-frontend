import PropTypes from "prop-types";
import toast from "react-hot-toast";
import React, {useEffect} from 'react';

import {LoadingButton} from "@mui/lab";
import {Stack, Dialog, DialogTitle, DialogContent} from "@mui/material";

import {defaultValues, useSectionForm} from "./form";
import {RHFTextField} from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/RHFFormProvider";
import {useCreateSectionToTopicMutation, useUpdateSectionToTopicMutation} from "../../../api/topic-api-req";

export function SectionAddEditForm({open, onClose, sectionsData, topic_id}) {

    const methods = useSectionForm()

    const [createSectionToTopic] = useCreateSectionToTopicMutation()

    const [updateSectionToTopic] = useUpdateSectionToTopicMutation()

    const {handleSubmit, reset, formState: {isSubmitting}} = methods;

    const handleClose = () => {
        onClose()
        reset(defaultValues)
    }

    const onSubmit = (data) => {
        if (!sectionsData?._id) {
            const promise = createSectionToTopic({body: data, topic_id,}).unwrap()
                .then(() => {
                    handleClose();
                })

            toast.promise(promise, {
                loading: "Yangi bo'lim qoshilmoqda...",
                success: "Yangi bo'lim mufaqqiyatli qo'shildi",
                error: (error) => `${error.data.message}`
            })
        } else {
            const promise = updateSectionToTopic({body: data, section_id: sectionsData?._id,}).unwrap()
                .then(() => {
                    handleClose();
                })

            toast.promise(promise, {
                loading: "Bo'lim  yangilanmoqda...",
                success: "Bo'lim mufaqqiyatli yangilandi",
                error: (error) => `${error.data.message}`
            })
        }

    }

    useEffect(() => {
        if (sectionsData) {
            reset({
                name: sectionsData?.name,
            })
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionsData])

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Bo&apos;lim ma&apos;lumotlari</DialogTitle>
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
                        <RHFTextField name="name" label="Bo'lim nomi"/>

                    </Stack>
                    <LoadingButton
                        fullWidth
                        type="submit"
                        loading={isSubmitting}
                        sx={{marginTop: 1}}
                        variant="contained"
                        color="inherit"
                        size="large"
                    >
                        {sectionsData?._id ? "Yangilash" : "Qo'shish"}
                    </LoadingButton>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}


SectionAddEditForm.propTypes = {
    sectionsData: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    topic_id: PropTypes.string,
}