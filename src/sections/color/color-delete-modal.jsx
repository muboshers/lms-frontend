import React from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import { LoadingButton } from '@mui/lab';
import { Dialog, Button, Typography, DialogActions, DialogContent } from '@mui/material';

import { useDeleteColorsMutation } from 'src/api/color-api-req';

export default function ColoryDeleteModal({ id, open, onClose, setId }) {
  const [deleteColor, delRes] = useDeleteColorsMutation();
  const handleDelete = async () => {
    if (!id) return;
    await deleteColor({ id })
      .unwrap()
      .then(() => {
        toast.success("Rang o'chirildi");
        onClose();
      });
  };

  const resetModal = () => {
    setId(null);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Typography variant="h6">Siz haqiqatdan ham o&apos;chirmoqchimisiz</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={resetModal} type="button">
          Yo&apos;q
        </Button>
        <LoadingButton
          loading={delRes.isLoading}
          variant="contained"
          color="success"
          type="button"
          onClick={handleDelete}
        >
          Ha
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

ColoryDeleteModal.propTypes = {
  open: PropTypes.bool,
  id: PropTypes.string,
  onClose: PropTypes.any,
  setId: PropTypes.any,
};
