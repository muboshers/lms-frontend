import * as yup from 'yup';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Dialog, Typography, DialogContent } from '@mui/material';

import { useCreateColorMutation, useUpdateColorMutation } from 'src/api/color-api-req';

import { RHFTextField } from 'src/components/hook-form';
import RHFFormProvider from 'src/components/hook-form/RHFFormProvider';

export default function ColorForm({ open, onClose, editData, id }) {
  const [createColor, colorRes] = useCreateColorMutation();

  const [updateColor, updateColorRes] = useUpdateColorMutation();

  const schema = yup.object().shape({
    color: yup.string().required('Rangni belgilash talab etiladi'),
  });

  const defaultValues = {
    color: '#ff0000',
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit, setValue, reset } = methods;

  const onSubmit = async (data) => {
    if (editData?._id) {
      updateColor({
        color: data.color,
        id,
      })
        .unwrap()
        .then(() => {
          toast.success("Rang mufaqqiyatli o'zgartirildi");
          onClose();
          reset();
        });
    } else {
      createColor(data)
        .unwrap()
        .then(() => {
          toast.success("Rang mufaqqiyatli qo'shildi");
          onClose();
          reset();
        });
    }
  };

  useEffect(() => {
    if (editData?.color) {
      setValue('color', editData?.color);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 1,
          }}
        >
          Kategoriya {editData?._id ? 'yangilash' : "qo'shish"}
        </Typography>
        <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField name="color" label="Rangni belgilang" type="color" />
          <LoadingButton
            variant="contained"
            type="submit"
            loading={colorRes.isLoading || updateColorRes?.isLoading}
            fullWidth
            sx={{
              marginTop: 1,
            }}
          >
            {editData?._id ? 'Saqlash' : 'Yaratish'}
          </LoadingButton>
        </RHFFormProvider>
      </DialogContent>
    </Dialog>
  );
}

ColorForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editData: PropTypes.any,
  id: PropTypes.any,
};
