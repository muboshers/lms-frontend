import React from 'react';

import { Box, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

export default function ProductNotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Iconify icon="carbon:data-1" width={100} />
      <Typography variant="h3">Mahsulotlar topilmadi</Typography>
      <Typography
        variant="h5"
        sx={{
          maxWidth: '450px',
          textAlign: 'center',
        }}
      >
        Afsuski biz mahsulorlarni topa olmadik iltimos qaytadan qidirib ko&apos;ring
      </Typography>
    </Box>
  );
}
