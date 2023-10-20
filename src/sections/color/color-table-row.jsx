import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Popover, TableRow, MenuItem, TableCell, IconButton } from '@mui/material';

import { fDateTime } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ColorTableRow({ colorRow, setEditData, openFn, setId, openDlModal }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const editButtonClick = () => {
    setEditData(colorRow);
    openFn();
    handleCloseMenu();
  };

  const delButtonClick = () => {
    setId(colorRow._id);
    openDlModal();
    handleCloseMenu();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell component="th" scope="row">
          <Box
            sx={{
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              backgroundColor: colorRow?.color,
            }}
          />
        </TableCell>

        <TableCell>{fDateTime(colorRow?.createdAt)}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={editButtonClick}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Yangilash
        </MenuItem>

        <MenuItem onClick={delButtonClick} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          O&apos;chirish
        </MenuItem>
      </Popover>
    </>
  );
}

ColorTableRow.propTypes = {
  colorRow: PropTypes.object,
  setEditData: PropTypes.any,
  openFn: PropTypes.func,
  setId: PropTypes.func,
  openDlModal: PropTypes.func,
};
