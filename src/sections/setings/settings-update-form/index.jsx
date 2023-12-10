/* eslint-disable no-useless-return */
import toast from 'react-hot-toast';
import React, { useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, Card, Stack, Typography } from '@mui/material';

import { fData } from 'src/utils/format-number';

import { useUpdateProfileMutation } from 'src/api/teaching-center-api-req';

import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/RHFFormProvider';
import { RHFUploadAvatar } from 'src/components/hook-form/RHFUpload';

import { useUpdataForm } from './form';

export default function SettingsUpdateForm() {
  const methods = useUpdataForm();

  const teaching_center = JSON.parse(localStorage.getItem('user'));

  const [updateProfile, updateProfileRes] = useUpdateProfileMutation();

  const { handleSubmit, reset } = methods;

  const MAX_FILE_SIZE = 3145728;

  const onSubmit = (data) => {
    const { logo } = data;
    updateProfile({
      ...data,
      logo: logo._id,
    })
      .unwrap()
      .then(() => {
        toast.success('Malumotlar mufaqqiyatli yangilandi');
      });
  };

  useEffect(() => {
    const teaching_center_data = teaching_center?.data?.teaching_center;

    if (!teaching_center_data) return;

    const {
      address = '',
      logo = null,
      location = '',
      name = '',
      tg_bot = {},
    } = teaching_center_data;
    reset({
      address,
      logo: {
        ...logo,
        preview: logo?.url,
      },
      location,
      name,
      tg_bot_token: tg_bot?.token ?? '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card
        sx={{
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <RHFUploadAvatar
            name="logo"
            maxSize={MAX_FILE_SIZE}
            helperText={
              <Typography
                variant="caption"
                sx={{
                  mt: 2,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                Yuklash mumkin *.jpeg, *.jpg, *.png.
                <br /> maxsimal joyi {fData(MAX_FILE_SIZE)}
              </Typography>
            }
          />
        </Box>
        <Stack marginY={3} flexDirection="row" alignItems="center" gap={2}>
          <RHFTextField name="name" label="O'quv markaz nomi*" />
          <RHFTextField name="address" label="O'quv markaz manzili*" />
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap={2}>
          <RHFTextField name="location" label="O'quv markaz joylashuvi*" />
        </Stack>
      </Card>
      <Stack alignItems="flex-end" marginTop={2}>
        <LoadingButton
          size="large"
          variant="contained"
          color="inherit"
          type="submit"
          loading={updateProfileRes.isLoading}
          sx={{
            paddingX: 12,
          }}
        >
          Saqlash
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
