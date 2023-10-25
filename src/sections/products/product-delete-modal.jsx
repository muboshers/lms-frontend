import React from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import { LoadingButton } from '@mui/lab';
import { Dialog, Button, Typography, DialogActions, DialogContent } from '@mui/material';

import { useDeleteProductMutation } from 'src/api/product-api-req';

export default function ProductDeleteModal({ id, open, onClose, setId }) {
  const [deleteProduct, delRes] = useDeleteProductMutation();
  
  const handleDelete = async () => {
    if (!id) return;
    await deleteProduct({ id })
      .unwrap()
      .then(() => {
        toast.success("Mahsulot o'chirildi");
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

ProductDeleteModal.propTypes = {
  open: PropTypes.bool,
  id: PropTypes.string,
  onClose: PropTypes.func,
  setId: PropTypes.func,
};
