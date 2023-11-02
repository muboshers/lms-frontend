/* eslint-disable no-unused-vars */
import React from "react";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoadingButton } from "@mui/lab";
import { Card, Stack, Container } from "@mui/material";

import { useRouter } from "src/routes/hooks";

import { hasEmptyValues } from "src/utils/object";

import { useGetColorsQuery } from "src/api/color-api-req";
import { useCreateProductMutation } from "src/api/product-api-req";

import { RHFTextField } from "src/components/hook-form";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import RHFFormProvider from "src/components/hook-form/RHFFormProvider";

import ColorRow from "./color-row";
import OptionRow from "./option-row";
import CategoryRow from "./category-row";

function NewProductForm() {
  const [createProduct, createProductRes] = useCreateProductMutation();

  const { push } = useRouter();

  const schema = yup.object().shape({
    title: yup.string().required("Mahsulot nomi talab etiladi"),
    description: yup.string().required("Mahsulot izohini yozish talab etiladi"),
    categories: yup.array().of(
      yup.object().shape({
        categoryId: yup
          .string()
          .required("Kategoriyani belgilash talab etiladi"),
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
        colorId: yup.string().required("Rangini belgilash talab etiladi"),
        images: yup
          .array()
          .min(1)
          .required("Eng kamida 1 ta rasm talab etiladi"),
      })
    ),
  });

  const defaultValues = {
    title: "",
    description: "",
    categories: [
      {
        categoryId: "",
      },
    ],
    option: [
      {
        name: "",
        value: "",
      },
    ],
    color: [
      {
        colorId: "",
        images: [],
      },
    ],
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const { data } = useGetColorsQuery();

  const onSubmit = async (requestBody) => {
    const formData = new FormData();
    const { title, description, categories, color, option } = requestBody;
    const categoryId = categories?.map((cat) => cat.categoryId);
    const images = color?.map((col) => col.images).flat();
    const isNotEmptyOption = hasEmptyValues(option);

    const colors = color.map((col) => {
      const imagePlace = [];
      for (let i = 0; i < col?.images?.length; i += 1) {
        const currentImageIdx = images.findIndex(
          (img) => img?.name === col?.images[i]?.name
        );
        if (currentImageIdx > -1) {
          imagePlace.push(currentImageIdx);
        }
      }

      return {
        ...col,
        imagePlace,
      };
    });

    for (let i = 0; i < images.length; i += 1) {
      formData.append("image", images[i]);
    }
    console.log(isNotEmptyOption);
    if (!isNotEmptyOption)
      formData.append("options", JSON.stringify(requestBody.option));

    formData.append("categoryId", JSON.stringify(categoryId));
    formData.append("colors", JSON.stringify(colors));
    formData.append("title", title);
    formData.append("description", description);

    await createProduct(formData)
      .unwrap()
      .then(() => {
        push("/products");
        toast.success("Mahsulot muffaqqiyatli qo'shildi");
      });
  };

  return (
    <Container>
      <CustomBreadcrumbs
        heading="Yangi mahsulot qo'shish"
        links={[
          { href: "/products  ", name: "Mahsulotlar ro'yhati" },
          { name: "Mahsulot qo'shish" },
        ]}
      />

      <Card
        sx={{
          padding: 2,
        }}
      >
        <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <RHFTextField name="title" label="Mahsulot nomini yozing" />
            <RHFTextField
              name="description"
              label="Mahsulot haqida yozing"
              multiline
              minRows={3}
            />
            <CategoryRow />
            <ColorRow colors={data} />
            <OptionRow />
          </Stack>

          <LoadingButton
            fullWidth
            variant="contained"
            color="success"
            type="submit"
            loading={createProductRes.isLoading}
            size="medium"
            sx={{
              maxWidth: "180px",
            }}
          >
            Saqlash
          </LoadingButton>
        </RHFFormProvider>
      </Card>
    </Container>
  );
}

export default NewProductForm;
