import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  tg_bot_token: yup.string().required('Telegram bot tokeni talab etiladi'),
  greeting_message: yup
    .string()
    .test(
      'includes-tg-user-name',
      'Salomlashish xabari  {{tg_user_name}} oz ichiga olishi kerak',
      (value) => value && value.includes('{{tg_user_name}}')
    ),
});

export const defaultValues = {
  tg_bot_token: '',
  greeting_message: '{{tg_user_name}}',
};

export const useTgForm = () =>
  useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
