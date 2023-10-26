import { useState } from 'react';
import PropTypes from 'prop-types';

import { Select, TableRow, MenuItem, TableCell, InputLabel, FormControl } from '@mui/material';

import { fDateTime } from 'src/utils/format-time';

import { useUpdateOrderStatusMutation } from 'src/api/order-api-req';

// ----------------------------------------------------------------------

export default function OrderTableRow({ orderRow, isLoading }) {
  const [orderStatus, setOrderStatus] = useState(orderRow?.status);

  const [updateOrderStatus, updateOrderRes] = useUpdateOrderStatusMutation();

  const STATUS = [
    {
      value: 'PENDING',
      label: 'Kutilyapti',
    },
    {
      value: 'START',
      label: 'Boshlangan',
    },

    {
      value: 'RECIEVE',
      label: 'Blocklangan',
    },

    {
      value: 'DONE',
      label: 'Tugadi',
    },
  ];
  const onChange = (event) => {
    setOrderStatus(event.target.value);
    updateOrderStatus({ id: orderRow._id, status: event.target.value });
  };

  return (
    <TableRow tabIndex={-1} role="checkbox">
      <TableCell component="th" scope="row">
        {orderRow?.client_id?.name}
      </TableCell>

      <TableCell>{orderRow?.client_id?.phone_number}</TableCell>
      <TableCell>{orderRow?.product_id?.title}</TableCell>
      <TableCell>{fDateTime(orderRow?.createdAt)}</TableCell>
      <TableCell>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id={orderRow?._id} s>
            Buyurtma holati
          </InputLabel>
          <Select
            disabled={updateOrderRes.isLoading || isLoading}
            labelId={orderRow?._id}
            id={orderRow?._id}
            value={orderStatus}
            defaultValue={orderRow?.status}
            label="Buyurtma holati"
            onChange={onChange}
          >
            {STATUS?.map((orStat, idx) => (
              <MenuItem
                value={orStat.value}
                key={orStat.value}
                selected={orStat?.value === orderRow.status}
              >
                {orStat.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
    </TableRow>
  );
}

OrderTableRow.propTypes = {
  orderRow: PropTypes.object,
  isLoading: PropTypes.bool,
};
