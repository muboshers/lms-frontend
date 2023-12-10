import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const defaultValues = {
  name: '',
  age: '',
  phone_number: '+998',
  login: '',
  password: '',
};

const schema = yup.object().shape({
  name: yup.string().required("O'qituvchi ismi yozilishi shart!"),
  age: yup.string().required("O'qituvchi yoshi yozilishi shart!"),
  login: yup.string().required("O'qituvchi logini yozilishi shart!"),
  password: yup.string().required("O'qituvchi paroli yozilishi shart!"),
  phone_number: yup
    .string()
    .min(13, 'Telefon formati xato!')
    .required("O'qituvchi yoshi yozilishi shart!"),
});

export const useTeacherForm = () =>
  useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
