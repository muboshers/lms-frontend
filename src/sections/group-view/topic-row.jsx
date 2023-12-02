import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Popover, TableRow, MenuItem, TableCell, IconButton } from '@mui/material';

import { totalTeacherPrice } from './utils';
import Iconify from '../../components/iconify';
import { fDate, fToNow } from '../../utils/format-time';

TopicRow.propTypes = {
  topicRow: PropTypes.any,
  handleEditFn: PropTypes.func,
  openDeleteWarnModal: PropTypes.func,
};

export function TopicRow({ topicRow, handleEditFn, openDeleteWarnModal }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const editFn = () => {
    handleEditFn(topicRow);
    handleCloseMenu();
  };

  const deleteFn = () => {
    openDeleteWarnModal(topicRow);
    handleCloseMenu();
  };

  return (
    <>
      <TableRow>
        <TableCell>{topicRow?.teacher_id?.name}</TableCell>
        <TableCell>{topicRow?.teacher_id?.phone_number}</TableCell>
        <TableCell>{topicRow?.percentage}%</TableCell>

        <TableCell>{topicRow?.price}</TableCell>

        <TableCell>
          {totalTeacherPrice(topicRow?.pupils?.length, topicRow?.price, topicRow?.percentage)}
        </TableCell>
        <TableCell>{topicRow?.time_of_day}</TableCell>
        <TableCell>{topicRow?.during_month} oy</TableCell>
        <TableCell>{topicRow.pupils.length}</TableCell>
        <TableCell>{fDate(topicRow.start_date)}</TableCell>
        <TableCell>{fToNow(topicRow?.createdAt)}</TableCell>
        <TableCell>
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
        <MenuItem onClick={editFn}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Yangilash
        </MenuItem>

        <MenuItem onClick={deleteFn} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          O&apos;chirish
        </MenuItem>
      </Popover>
    </>
  );
}