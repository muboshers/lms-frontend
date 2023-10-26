import PropTypes from 'prop-types';

import { TableRow, TableCell } from '@mui/material';

import { fDateTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function ColorTableRow({ clientRow }) {
  return (
    <TableRow tabIndex={-1} role="checkbox">
      <TableCell component="th" scope="row">
        {clientRow?.name}
      </TableCell>

      <TableCell>{clientRow?.phone_number}</TableCell>
      <TableCell>{clientRow?.product_id?.length}</TableCell>
      <TableCell>{fDateTime(clientRow?.createdAt)}</TableCell>
    </TableRow>
  );
}

ColorTableRow.propTypes = {
  clientRow: PropTypes.object,
};
