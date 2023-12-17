import React from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import {useParams} from "react-router-dom";

import {LoadingButton} from '@mui/lab';
import {Dialog, Button, DialogTitle, DialogContent, DialogActions} from '@mui/material';

import {useDeletePupilsMutation} from "src/api/pupils-api-req";

PupilsDeleteWarningModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    pupilsId: PropTypes.string.isRequired,
};

export default function PupilsDeleteWarningModal({open, onClose, pupilsId}) {
    const [deletePupils, deletePupilsRes] = useDeletePupilsMutation();

    const {id} = useParams()

    const handleDelete = () => {
        if (!pupilsId) return null;

        const promise = deletePupils({id: pupilsId, topic_id: id})
            .unwrap()
            .then(() => {
                onClose();
            });

        toast.promise(promise, {
            loading: "O'quvchi o'chirilmoqda...",
            success: "O'quvchi mufaqqiyatli  o'chirildi",
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
                O&apos;quvchini o&apos;chirish
            </DialogTitle>
            <DialogContent>
                Siz haqiqatdan ham ushbu o&apos;quvchini o&apos;chirib tashlamoqchimisiz?
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
                    loading={deletePupilsRes.isLoading}
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
