import { useForm } from 'react-hook-form';

export const defaultValues = {
  logo: null,
  address: '',
  location: '',
  name: '',
  tg_bot_token: '',
};

export const useUpdataForm = () =>
  useForm({
    defaultValues,
  });
