import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';


TableEmptyRows.propTypes = {
    emptyRows: PropTypes.number,
    height: PropTypes.number,
    colsNum: PropTypes.number
}

export function TableEmptyRows({emptyRows, height, colsNum}) {
    if (!emptyRows) {
        return null;
    }

    return (
        <TableRow
            sx={{
                ...(height && {
                    height: height * emptyRows,
                }),
            }}
        >
            <TableCell colSpan={colsNum}/>
        </TableRow>
    );
}
