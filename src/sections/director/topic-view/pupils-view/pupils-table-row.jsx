import PropTypes from "prop-types";
import React, {useState} from 'react';

import {Popover, TableRow, MenuItem, TableCell, IconButton} from "@mui/material";

import Iconify from "../../../../components/iconify";
import {formatPhoneNumber} from "../../../../utils/format-number";


export default function PupilsTableRow({row, index, deleteFn, setIsOpen, setPupilsData}) {
    const [open, setOpen] = useState(null);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };


    const handleCloseMenu = () => {
        setOpen(null);
    };

    const editFn = () => {
        setPupilsData(row)
        setIsOpen(true)
        handleCloseMenu()
    }


    return (
        <>

            <TableRow>
                <TableCell>{index}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{formatPhoneNumber(row.parent_contact_information)}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>
                    <IconButton onClick={handleOpenMenu}>
                        <Iconify icon="eva:more-vertical-fill"/>
                    </IconButton>
                </TableCell>
            </TableRow>
            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                PaperProps={{
                    sx: {width: 140},
                }}
            >
                <MenuItem onClick={editFn}>
                    <Iconify icon="eva:edit-fill" sx={{mr: 2}}/>
                    Yangilash
                </MenuItem>

                <MenuItem onClick={deleteFn} sx={{color: 'error.main'}}>
                    <Iconify icon="eva:trash-2-outline" sx={{mr: 2}}/>
                    O&apos;chirish
                </MenuItem>
            </Popover>
        </>
    )
        ;
}

PupilsTableRow.propTypes = {
    row: PropTypes.any,
    index: PropTypes.number,
    deleteFn: PropTypes.func,
    setIsOpen: PropTypes.func,
    setPupilsData: PropTypes.func
}

