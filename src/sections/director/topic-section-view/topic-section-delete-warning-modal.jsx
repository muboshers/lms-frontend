import React from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import {LoadingButton} from '@mui/lab';
import {Button, Dialog, DialogTitle, DialogActions, DialogContent} from '@mui/material';

import {useDeleteSectionToTopicMutation} from "../../../api/topic-api-req";

TopicSectionDeleteWarningModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    section_id: PropTypes.string.isRequired,
};

export default function TopicSectionDeleteWarningModal({open, onClose, section_id}) {
    const [deleteSection, deleteSectionRes] = useDeleteSectionToTopicMutation();

    const handleDelete = () => {
        if (!section_id) return null;

        const promise = deleteSection({section_id,})
            .unwrap()
            .then(() => {
                onClose();
            });

        toast.promise(promise, {
            loading: "Bo'lim o'chirilmoqda...",
            success: "Bo'lim mufaqqiyatli  o'chirildi",
        });

        return true;
    };

    return (
        <Dialog open={open} onClose={onClose} sx={{maxWidth: '420px', margin: '0 auto'}}>
            <DialogTitle
                sx={{
                    textAlign: 'center',
                }}
            >
                Bo&apos;limni o&apos;chirish
            </DialogTitle>
            <DialogContent>
                Siz haqiqatdan ham ushbu bo&apos;limni o&apos;chirib tashlamoqchimisiz?
            </DialogContent>

            <DialogActions
                sx={{
                    paddingX: '1rem',
                    paddingBottom: '1rem',
                    justifyContent: 'center',
                }}
            >
                <Button onClick={onClose} size="large" variant="contained" color="inherit">
                    Bekor qilish
                </Button>
                <LoadingButton
                    loading={deleteSectionRes.isLoading}
                    size="large"
                    variant="contained"
                    color="error"
                    type="button"
                    onClick={handleDelete}
                >
                    Ha o&apos;chirish
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}
