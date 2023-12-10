import React from 'react';
import PropTypes from 'prop-types';

import { TableRow, TableCell } from '@mui/material';

TeacherTableRow.propTypes = {
  age: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  pupils_count: PropTypes.number.isRequired,
  teacher_income: PropTypes.number.isRequired,
  phone_number: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default function TeacherTableRow({
  age,
  name,
  phone_number,
  pupils_count,
  teacher_income,
  _id,
  index,
}) {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{phone_number}</TableCell>
      <TableCell>{age}</TableCell>
      <TableCell>{pupils_count}</TableCell>
      <TableCell>{teacher_income}</TableCell>
      <TableCell />
    </TableRow>
  );
}
