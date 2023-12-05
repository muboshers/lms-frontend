/* eslint-disable react/prop-types */
import { useCallback } from 'react';
import toast from 'react-hot-toast';
// form
import { Controller, useFormContext } from 'react-hook-form';

// @mui
import { FormHelperText } from '@mui/material';

import { IMAGE_TYPES } from 'src/contants';
import { useUploadFileMutation } from 'src/api/file-api-req';

//
import { Upload, UploadBox, UploadAvatar } from '../upload';
import SpinnerLoader from '../spinner-loader/spinner-loader';

// ----------------------------------------------------------------------

export function RHFUploadAvatar({ name, ...other }) {
  const { control, setValue } = useFormContext();
  const [fileUpload, fileUploadRes] = useUploadFileMutation();
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (!IMAGE_TYPES.includes(file?.type)) {
        toast.error('Faqat jpg va png turidagi rasmlarni yuklay olasiz');
        return;
      }

      const formData = new FormData();

      formData.append('image', file);

      fileUpload({ formData })
        .unwrap()
        .then((res) => {
          const newFile = Object.assign(file, {
            preview: URL.createObjectURL(file),
            _id: res?.data?._id,
          });
          if (file) {
            setValue(name, newFile, { shouldValidate: true });
          }
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValue]
  );

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <UploadAvatar
              accept={{
                'image/*': [],
              }}
              error={!!error}
              file={field.value}
              onDrop={handleDrop}
              {...other}
            />

            {!!error && (
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {error.message}
              </FormHelperText>
            )}
          </div>
        )}
      />

      {fileUploadRes.isLoading && <SpinnerLoader />}
    </>
  );
}

// ----------------------------------------------------------------------

export function RHFUploadBox({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UploadBox files={field.value} error={!!error} {...other} />
      )}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFUpload({ name, multiple, helperText, ...other }) {
  const [fileUpload, fileUploadRes] = useUploadFileMutation();

  const { control, setValue, watch } = useFormContext();

  const values = watch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (!IMAGE_TYPES.includes(file.type)) {
        toast.error('Faqat jpg va png turidagi rasmlarni yuklay olasiz');
        return;
      }

      const formData = new FormData();

      formData.append('image', file);

      fileUpload({ formData })
        .unwrap()
        .then((res) => {
          const { url, _id } = res.data;
          setValue(
            `image`,
            {
              url,
              id: _id,
            },
            {
              shouldValidate: true,
            }
          );
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValue, values.image]
  );

  const handleRemoveFile = (inputFile) => {
    setValue(name, {
      url: '',
      id: '',
    });
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) =>
          multiple ? (
            <Upload
              multiple
              accept={{ 'image/*': [] }}
              files={field.value}
              error={!!error}
              helperText={
                (!!error || helperText) && (
                  <FormHelperText error={!!error} sx={{ px: 2 }}>
                    {error ? error?.message : helperText}
                  </FormHelperText>
                )
              }
              {...other}
            />
          ) : (
            <Upload
              accept={{ 'image/*': [] }}
              file={field.value?.url}
              error={!!error}
              onDrop={handleDrop}
              onRemove={handleRemoveFile}
              helperText={
                (!!error || helperText) && (
                  <FormHelperText error={!!error} sx={{ px: 2 }}>
                    {error ? error?.message : helperText}
                  </FormHelperText>
                )
              }
              {...other}
            />
          )
        }
      />
      {fileUploadRes.isLoading && <SpinnerLoader />}
    </>
  );
}
