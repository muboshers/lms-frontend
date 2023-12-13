import React from 'react';
import PropTypes from "prop-types";

import {TableRow, TableCell} from "@mui/material";

import {formatPhoneNumber} from "../../../utils/format-number";


PupilsTableRow.propTypes = {
    row: PropTypes.any,
    index: PropTypes.number
}

export default function PupilsTableRow({row, index}) {
    return (
        <TableRow>
            <TableCell>{index}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{formatPhoneNumber(row.parent_contact_information)}</TableCell>
            <TableCell>{row.age}</TableCell>
        </TableRow>
    );
}
