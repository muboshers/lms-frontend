import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Card, Stack, Container } from '@mui/material';

import { useGetColorsQuery } from 'src/api/color-api-req';

import { RHFTextField } from 'src/components/hook-form';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import RHFFormProvider from 'src/components/hook-form/RHFFormProvider';

import ColorRow from './color-row';
import OptionRow from './option-row';
import CategoryRow from './category-row';

function NewProductForm() {
  const schema = yup.object().shape({
    title: yup.string().required('Mahsulot nomi talab etiladi'),
    description: yup.string().required('Mahsulot izohini yozish talab etiladi'),
    categories: yup.array().of(
      yup.object().shape({
        categoryId: yup.string().required('Kategoriyani belgilash talab etiladi'),
      })
    ),
    option: yup.array().of(
      yup.object().shape({
        name: yup.string().notRequired(),
        value: yup.string().notRequired(),
        imagePlace: yup.array().notRequired(),
      })
    ),
    color: yup.array().of(
      yup.object().shape({
        colorId: yup.string().required('Rangini belgilash talab etiladi'),
        images: yup.array().min(1).required('Eng kamida 1 ta rasm talab etiladi'),
      })
    ),
  });

  const defaultValues = {
    title: '',
    description: '',
    categories: [
      {
        categoryId: '',
      },
    ],
    option: [
      {
        name: '',
        value: '',
      },
    ],
    color: [
      {
        colorId: '',
        images: [],
      },
    ],
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const { data } = useGetColorsQuery();

  const onSubmit = (formData) => {
    const categoryId = formData?.categories?.map((cat) => cat.categoryId);
    const images = formData?.color?.map((color) => color.images).flat();

    const colors = formData.color.map((color) => {
      const imagePlace = [];
      for (let i = 0; i < color.images.length; i += 1) {
        const currentImageIdx = images.findIndex((img) => img?.name === color.images[i].name);
        if (currentImageIdx > -1) {
          imagePlace.push(currentImageIdx);
        }
      }

      return {
        ...color,
        imagePlace,
      };
    });

    console.log(colors);
    console.log(categoryId);
    console.log(images);
    console.log(formData);
  };

  return (
    <Container>
      <CustomBreadcrumbs
        heading="Yangi mahsulot qo'shish"
        links={[{ href: '/product', name: "Mahsulotlar ro'yhati" }, { name: "Mahsulot qo'shish" }]}
      />

      <Card
        sx={{
          padding: 2,
        }}
      >
        <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <RHFTextField name="title" label="Mahsulot nomini yozing" />
            <RHFTextField name="description" label="Mahsulot haqida yozing" multiline minRows={3} />
            <CategoryRow />
            <ColorRow colors={data} />
            <OptionRow />
          </Stack>
          <button
            type="submit"
            onClick={() => {
              console.log(errors);
            }}
          >
            Yaratish
          </button>
        </RHFFormProvider>
      </Card>
    </Container>
  );
}

export default NewProductForm;
