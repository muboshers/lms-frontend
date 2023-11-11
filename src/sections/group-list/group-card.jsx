import React from "react";
import PropTypes from "prop-types";

import { Card, Stack, Tooltip, Typography } from "@mui/material";

import { useRouter } from "src/routes/hooks";
import { TEACHING_CENTER_DASHBOARD_PATH } from "src/routes/path";

import Iconify from "src/components/iconify";

export default function GroupCard({ data }) {
  const { push } = useRouter();

  return (
    <Card
      sx={{
        padding: 1.5,
        height: "100%",
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          maxHeight: "150px",
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
          cursor: "pointer",
        }}
        mb={1}
        onClick={() =>
          push(`${TEACHING_CENTER_DASHBOARD_PATH.GROUP_VIEW}/${data._id}`)
        }
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
