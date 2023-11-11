import PropTypes from 'prop-types';

// @mui
import {TableRow, TableCell, TableHead} from '@mui/material';

// ----------------------------------------------------------------------

ListHead.propTypes = {
    headLabel: PropTypes.array,
};

export default function ListHead({headLabel}) {
    return (
        <TableHead>
            <TableRow>
                {headLabel.map((headCell) => (
                    <TableCell key={headCell?.label} align={headCell.alignRight ? 'right' : 'left'}>
                        {headCell?.label}
                    </TableCell>
                ))}
                <TableCell/>
            </TableRow>
        </TableHead>
    );
}
