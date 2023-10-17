import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from 'src/theme/css';
import { useLoginMutation } from 'src/api/auth-api-req';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';
import RHFFormProvider from 'src/components/hook-form/RHFFormProvider';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const [login, loginRes] = useLoginMutation();

  const defaultValues = {
    login: '',
    password: '',
  };

  const schema = yup.object().shape({
    login: yup
      .string()
      .min(3, "Minimal 3 ta belgidan iborat bo'lishi kerak")
      .required('Login talab etiladi'),
    password: yup
      .string()
      .min(4, "Minimal 4 ta belgidan iborat bo'lishi kerak")
      .required('Parol talab etiladi'),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    login({ ...data })
      .unwrap()
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 480,
          }}
        >
          <Typography variant="h4">Furniture-Commercega ga kirish</Typography>
          <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} my={2}>
              <RHFTextField name="login" label="Login" />
              <RHFTextField
                name="password"
                label="Kirish paroli"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              variant="contained"
              type="submit"
              color="inherit"
              loading={loginRes.isLoading}
            >
              Kirish
            </LoadingButton>
          </RHFFormProvider>
        </Card>
      </Stack>
    </Box>
  );
}
