import React from "react";

import { Card, Skeleton } from "@mui/material";

export default function GroupCardLoading() {
  return (
    <Card
      sx={{
        padding: 1.5,
      }}
    >
      <Skeleton
        variant="rounded"
        width="100%"
        height={218}
        sx={{
          mb: 1,
        }}
      />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={150} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="90%" />
    </Card>
  );
}
