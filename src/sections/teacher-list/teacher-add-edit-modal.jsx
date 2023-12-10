import React from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import { LoadingButton } from '@mui/lab';
import { Stack, Dialog, DialogTitle, DialogContent } from '@mui/material';

import { CLEAVE_PHONE_CONFIG } from 'src/contants';
import { useCreateTeacherMutation } from 'src/api/teacher-api-req';

import FormProvider from 'src/components/hook-form/RHFFormProvider';
import { RHFTextField, RHFCleaveField } from 'src/components/hook-form';

import { useTeacherForm } from './form';

TeacherAddEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default function TeacherAddEditModal({ open, onClose }) {
  const [createTeacher, createTeacherRes] = useCreateTeacherMutation();

  const methods = useTeacherForm();

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    createTeacher(data)
      .unwrap()
      .then(() => {
        toast.success("O'qituvchi mufaqqiyatli qo'shildi");
        onClose();
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Topik ma&apos;lumotlari</DialogTitle>
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
            <RHFTextField name="name" label="Ismi va Familiyasi" />
            <RHFTextField name="age" label="O'qituvchining yoshi" />
            <RHFCleaveField
              name="phone_number"
              label="O'qituvchining telefon raqami"
              options={CLEAVE_PHONE_CONFIG}
            />
            <RHFTextField name="login" label="O'qituvchi uchin login" />
            <RHFTextField name="password" label="O'qituvchi uchun parol" type="password" />
          </Stack>
          <LoadingButton
            fullWidth
            type="submit"
            loading={createTeacherRes.isLoading}
            sx={{ marginTop: 1 }}
            variant="contained"
            color="inherit"
            size="large"
          >
            Qo&apos;shish
          </LoadingButton>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
