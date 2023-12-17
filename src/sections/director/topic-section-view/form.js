import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

export const defaultValues = {
    name: '',
};

const schema = yup.object().shape({
    name: yup.string().required("Bo'lim nomi yozilishi shart!"),
});

export const useSectionForm = () =>
    useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

