import React from "react";

import { Stack, Typography } from "@mui/material";

import Iconify from "src/components/iconify";

export default function GroupNotFound() {
  return (
    <Stack alignItems="center" justifyContent="center" marginTop={3} gap={1.5}>
      <Iconify icon="nonicons:not-found-16" width={100} />
      <Typography
        sx={{
          fontSize: "22px",
          maxWidth: "550px",
          textAlign: "center",
        }}
      >
        Afsuski guruhlar haqida ma&apos;lumot topa olmadik yangi guruh
        qo&apos;shib tekshirib ko&apos;ring
      </Typography>
    </Stack>
  );
}
