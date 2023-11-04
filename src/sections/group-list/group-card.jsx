import React from "react";
import PropTypes from "prop-types";

import { Card, Stack, Tooltip, Typography } from "@mui/material";

import Iconify from "src/components/iconify";

export default function GroupCard({ data }) {
  return (
    <Card
      sx={{
        padding: 1.5,
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          maxHeight: "218px",
          borderRadius: "8px",
          objectFit: "contain",
        }}
        loading="lazy"
        alt={data?.name}
        src={data?.image?.url}
      />

      <Typography
        sx={{
          fontWeight: "500",
        }}
        mb={1}
      >
        {data.name}
      </Typography>

      <Stack flexDirection="row" alignItems="center" gap={3}>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Tooltip title={`${data?.topics?.length ?? 0} o'qituvchilar soni`}>
            <Iconify icon="mdi:teacher" />
          </Tooltip>

          <Tooltip title={`${data?.topics?.length ?? 0} o'quvchilar soni`}>
            <Iconify icon="ic:round-groups-2" />
          </Tooltip>
        </Stack>
      </Stack>
    </Card>
  );
}

GroupCard.propTypes = {
  data: PropTypes.any,
};
