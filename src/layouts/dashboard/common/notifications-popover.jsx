import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Stack,
  Badge,
  Avatar,
  Tooltip,
  Popover,
  Divider,
  Typography,
  IconButton,
} from '@mui/material';

import { fDate } from 'src/utils/format-time';

import { useUpdateNotificationToReadMutation } from 'src/api/notificaiton-api-req';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export default function NotificationsPopover({ data, setClonedNotificationData }) {
  const [open, setOpen] = useState(null);

  const [updateToRead, updateToReadRes] = useUpdateNotificationToReadMutation();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  // eslint-disable-next-line no-unused-vars, consistent-return
  const onRead = async (id) => {
    if (updateToReadRes?.isLoading || !id) return null;

    await updateToRead({ id })
      .unwrap()
      .then(() => {
        setClonedNotificationData((prev) => prev?.filter((not) => not?._id !== id));
      });
  };

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge badgeContent={data?.length} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Xabarlar</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sizda {data?.length} ta o&apos;qilmagan xabar bor
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          {data?.length === 0 ? (
            <Typography
              sx={{
                padding: 3,
              }}
            >
              Hozircha hech qanday xabar yo&apos;q
            </Typography>
          ) : (
            data?.map((not) => (
              <Stack
                key={not?._id}
                flexDirection="row"
                alignItems="center"
                paddingX={3}
                paddingY={1}
                gap={1}
              >
                <Avatar src={not?.orderId?.product_id?.color[0].images[0]} />
                <Box>
                  <Typography>{not?.orderId?.client_id?.name}</Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                    }}
                  >
                    {fDate(not?.orderId?.createdAt)} sanada buyurtma berilgan
                  </Typography>
                </Box>
                <Tooltip title="O'qilgan deb belgilash" placement="top" enterDelay={0}>
                  <IconButton
                    type="button"
                    color="success"
                    disabled={updateToReadRes.isLoading}
                    onClick={() => onRead(not?._id)}
                  >
                    <Iconify icon="ri:check-double-fill" />
                  </IconButton>
                </Tooltip>
              </Stack>
            ))
          )}
        </Scrollbar>
      </Popover>
    </>
  );
}

NotificationsPopover.propTypes = {
  data: PropTypes.any,
  setClonedNotificationData: PropTypes.func,
};
