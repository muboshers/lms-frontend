import React from 'react';

import { Box, Card, Stack, Skeleton } from '@mui/material';

export default function ProductCardLoader() {
  return (
    <Card
      sx={{
        height: '360px',
      }}
    >
      <Box
        sx={{
          height: '70%',
        }}
      >
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>
      <Stack spacing={1} sx={{ py: 3, px: 2 }}>
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
          <Skeleton variant="rectangular" width={100} height={20} />
          <Skeleton variant="rectangular" width={40} height={20} />
        </Stack>
        <Skeleton variant="rectangular" width={180} height={10} />
        <Skeleton variant="circular" width={25} height={25} />
      </Stack>
    </Card>
  );
}
