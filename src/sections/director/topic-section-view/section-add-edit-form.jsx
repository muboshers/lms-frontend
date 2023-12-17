import React from 'react';
import PropTypes from "prop-types";
import toast from "react-hot-toast";

import {LoadingButton} from "@mui/lab";
import {Stack, Dialog, DialogTitle, DialogContent} from "@mui/material";

import {useSectionForm} from "./form";
import {RHFTextField} from "../../../components/hook-form";
import FormProvider from "../../../components/hook-form/RHFFormProvider";
import {useCreateSectionToTopicMutation} from "../../../api/topic-api-req";

export function SectionAddEditForm({open, onClose, sectionsData, topic_id}) {

    const methods = useSectionForm()

    const [createSectionToTopic, createSectionRes] = useCreateSectionToTopicMutation()

    const {handleSubmit} = methods;

    const onSubmit = (data) => {
        const promise = createSectionToTopic({body: data, topic_id,}).unwrap()
            .then(() => {
                onClose();
            })

        toast.promise(promise, {
            loading: "Yangi bo'lim qoshilmoqda...",
            success: "Yangi bo'lim mufaqqiyatli qo'shildi",
            error: (error) => `${error.data.message}`
        })
    }

    return (
        <Dialog open={open} onClose={onClose}>
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
                        loading={createSectionRes.isLoading}
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