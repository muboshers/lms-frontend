import { useForm } from 'react-hook-form';

export const defaultValues = {
  logo: null,
  address: '',
  location: '',
  name: '',
};

export const useUpdataForm = () =>
  useForm({
    defaultValues,
  });
