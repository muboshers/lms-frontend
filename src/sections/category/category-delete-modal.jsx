import React from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import { LoadingButton } from '@mui/lab';
import { Dialog, Button, Typography, DialogActions, DialogContent } from '@mui/material';

import { useDeleteCategoryMutation } from 'src/api/category-api.req';

export default function CategoryDeleteModal({ id, open, onClose, setId }) {
  const [deleteCategory, delRes] = useDeleteCategoryMutation();
  const handleDelete = async () => {
    if (!id) return;
    await deleteCategory({ id })
      .unwrap()
      .then(() => {
        toast.success("Kategoriya o'chirildi");
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

CategoryDeleteModal.propTypes = {
  open: PropTypes.func,
  id: PropTypes.string,
  onClose: PropTypes.func,
  setId: PropTypes.func,
};
