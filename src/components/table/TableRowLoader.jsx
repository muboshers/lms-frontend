/* eslint-disable no-unused-vars */
import React from 'react';
import Proptypes from 'prop-types';

import { Skeleton, TableRow, TableCell } from '@mui/material';

TableRowLoader.propTypes = {
  rowsNum: Proptypes.number.isRequired,
  columsNum: Proptypes.number.isRequired,
};

export default function TableRowLoader({ rowsNum, columsNum }) {
  return [...Array(rowsNum)].map((_, index) => (
    <TableRow key={index}>
      <TableCell component="th" scope="row">
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      {[...Array(columsNum - 1)].map((t, subIdx) => (
        <TableCell key={subIdx + index}>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
      ))}
    </TableRow>
  ));
}
