import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

export const defaultValues = {
    name: '',
    age: 0,
    parent_contact_information: '+998',

};

const schema = yup.object().shape({
    name: yup.string().required("O'quvchi ismi yozilishi shart!"),
    age: yup.string().required("O'quvchi yoshi yozilishi shart!"),
    parent_contact_information: yup
        .string()
        .min(13, 'Telefon formati xato!')
        .required("O'quvchiga masul shahsing  telefon raqami yozilishi shart!"),
});

export const usePupilsForm = () =>
    useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

