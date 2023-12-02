import React from 'react';
import PropTypes from 'prop-types';

import { LoadingButton } from '@mui/lab';
import { Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

GroupDeleteWarningMopdal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteFn: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export function GroupDeleteWarningMopdal({ open, onClose, deleteFn, isLoading }) {
  return (
    <Dialog open={open} onClose={onClose} sx={{ maxWidth: '420px', margin: '0 auto' }}>
      <DialogTitle
        sx={{
          textAlign: 'center',
        }}
      >
        Guruhni o&apos;chirish
      </DialogTitle>
      <DialogContent>
        Siz haqiqatdan ham ushbu guruhni o&apos;chirib tashlamoqchimisiz?
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
          loading={isLoading}
          onClick={deleteFn}
          size="large"
          variant="contained"
          color="error"
        >
          Ha o&apos;chirish
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
