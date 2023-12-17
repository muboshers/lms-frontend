import React, { useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';

import { useUpdateTgBotMutation } from 'src/api/teaching-center-api-req';

import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/RHFFormProvider';

import { useTgForm } from './form';

export default function SettingsTelegramForm() {
  const methods = useTgForm();

  const [updateTelegram, updateTelegramRes] = useUpdateTgBotMutation();

  const onSubmit = (data) => {
    updateTelegram(data);
  };

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    const tgInfo = JSON.parse(localStorage.getItem('user'));
    if (!tgInfo?.data?.teaching_center?.tg_bot) return;
    const { greeting_message, token } = tgInfo.data.teaching_center.tg_bot;

    reset({
      tg_bot_token: token,
      greeting_message,
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
        <RHFTextField name="tg_bot_token" label="Telegram bot tokeni" />

        <RHFTextField
          name="greeting_message"
          label="Salomlashis xabari"
          sx={{
            marginTop: 2,
          }}
          multiline
          rows={5}
        />
      </Card>

      <Stack alignItems="flex-end" marginTop={2}>
        <LoadingButton
          size="large"
          loading={updateTelegramRes.isLoading}
          variant="contained"
          color="inherit"
          type="submit"
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
