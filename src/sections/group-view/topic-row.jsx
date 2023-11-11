import React from 'react';
import PropTypes from "prop-types";

import {TableRow, TableCell} from "@mui/material";

import {totalTeacherPrice} from "./utils";
import {fDate, fToNow} from "../../utils/format-time";

TopicRow.propTypes = {
    topicRow: PropTypes.any,
}

export function TopicRow({topicRow}) {
    return (
        <TableRow>
            <TableCell>
                {topicRow?.teacher_id?.name}
            </TableCell>
            <TableCell>
                {topicRow?.teacher_id?.phone_number}
            </TableCell>
            <TableCell>
                {topicRow?.percentage}%
            </TableCell>

            <TableCell>
                {topicRow?.price}
            </TableCell>

            <TableCell>
                {totalTeacherPrice(topicRow?.pupils?.length, topicRow?.price, topicRow?.percentage)}
            </TableCell>
            <TableCell>
                {topicRow?.time_of_day}
            </TableCell>
            <TableCell>
                {topicRow?.during_month} oy
            </TableCell>
            <TableCell>
                {topicRow.pupils.length}
            </TableCell>
            <TableCell>
                {fDate(topicRow.start_date)}
            </TableCell>
            <TableCell>
                {fToNow(topicRow?.createdAt)}
            </TableCell>
        </TableRow>
    );
}
