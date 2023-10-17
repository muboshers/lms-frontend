import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function CategoryTableRow({ categoryRow, setEditData, openFn, setId, openDlModal }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const { push } = useRouter();

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const editButtonClick = () => {
    setEditData(categoryRow);
    openFn();
    handleCloseMenu();
  };

  const delButtonClick = () => {
    setId(categoryRow._id);
    openDlModal();
    handleCloseMenu();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {categoryRow?.name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{categoryRow?.children?.length}</TableCell>

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
        <MenuItem
          onClick={() => push(`/category/${categoryRow?._id}`)}
          sx={{ color: 'success.main' }}
        >
          <Iconify icon="ph:eye-light" sx={{ mr: 2 }} />
          K&apos;rish
        </MenuItem>
      </Popover>
    </>
  );
}

CategoryTableRow.propTypes = {
  categoryRow: PropTypes.array,
  setEditData: PropTypes.any,
  openFn: PropTypes.func,
  setId: PropTypes.func,
  openDlModal: PropTypes.func,
};
