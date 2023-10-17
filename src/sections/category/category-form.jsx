import * as yup from 'yup';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Dialog, Typography, DialogContent } from '@mui/material';

import { useCreateCategoryMutation, useUpdateCategoryMutation } from 'src/api/category-api.req';

import { RHFTextField } from 'src/components/hook-form';
import RHFFormProvider from 'src/components/hook-form/RHFFormProvider';

export default function CategoryForm({ open, onClose, editData, id }) {
  const [createCategory, categoryRes] = useCreateCategoryMutation();

  const [updateCategory, updateCategoryRes] = useUpdateCategoryMutation();

  const schema = yup.object().shape({
    name: yup.string().required('Nomi talab etiladi'),
  });

  const defaultValues = {
    name: '',
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit, setValue, reset } = methods;

  const onSubmit = async (data) => {
    if (editData?._id) {
      updateCategory({
        _id: editData?._id,
        name: data.name,
        parent_id: id,
      })
        .unwrap()
        .then(() => {
          toast.success('Kategoriya mufaqqiyatli yangilandi');
          onClose();
          reset();
        });
    } else {
      createCategory({
        name: data.name,
        parent_id: id,
      })
        .unwrap()
        .then(() => {
          toast.success("Kategoriya mufaqqiyatli qo'shildi");
          onClose();
          reset();
        });
    }
  };

  useEffect(() => {
    if (editData?.name) {
      setValue('name', editData?.name);
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
          <RHFTextField name="name" label="Kategoriya nomini yozing" />
          <LoadingButton
            variant="contained"
            type="submit"
            loading={categoryRes.isLoading || updateCategoryRes?.isLoading}
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

CategoryForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editData: PropTypes.any,
  id: PropTypes.any,
};
