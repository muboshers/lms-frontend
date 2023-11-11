import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function TableNoData({query, colsNum, subQuery}) {
    return (
        <TableRow>
            <TableCell align="center" colSpan={colsNum} sx={{py: 3}}>
                <Paper
                    sx={{
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h6" paragraph>
                        {query}
                    </Typography>

                    <Typography variant="body2">
                        {subQuery}
                    </Typography>
                </Paper>
            </TableCell>
        </TableRow>
    );
}

TableNoData.propTypes = {
    query: PropTypes.string,
    colsNum: PropTypes.number,
    subQuery: PropTypes.string
};