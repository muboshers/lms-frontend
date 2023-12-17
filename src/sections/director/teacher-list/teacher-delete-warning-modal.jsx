import React from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import {LoadingButton} from '@mui/lab';
import {Dialog, Button, DialogTitle, DialogContent, DialogActions} from '@mui/material';

import {useDeleteTeacherMutation} from '../../../api/teacher-api-req';

TeacherListDeleteConfirm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    teacherId: PropTypes.string.isRequired,
};

export default function TeacherListDeleteConfirm({open, onClose, teacherId}) {
    const [deleteTeacher, deleteTeacherRes] = useDeleteTeacherMutation();

    const handleDelete = () => {
        if (!teacherId) return null;

        const promise = deleteTeacher({id: teacherId})
            .unwrap()
            .then(() => {
                onClose();
            });

        toast.promise(promise, {
            loading: "O'qituvchi o'chirilmoqda...",
            success: "O'qituvchi mufaqqiyatli  o'chirildi",
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
                O&apos;qituvchini o&apos;chirish
            </DialogTitle>
            <DialogContent>
                Siz haqiqatdan ham ushbu o&apos;qituvchini o&apos;chirib tashlamoqchimisiz?
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
                    loading={deleteTeacherRes.isLoading}
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
