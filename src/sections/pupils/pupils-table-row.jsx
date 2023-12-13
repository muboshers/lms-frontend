import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {Popover, MenuItem, TableRow, TableCell, IconButton} from '@mui/material';

import Iconify from '../../components/iconify';
import {formatPhoneNumber} from "../../utils/format-number";

PupilsTableRow.propTypes = {
    age: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    parent_contact_information: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    setPupilsId: PropTypes.func,
    setDeleteModalOpen: PropTypes.func,
    setPupilsData: PropTypes.func,
    setIsOpen: PropTypes.func
};

export default function PupilsTableRow({
                                           age,
                                           name,
                                           parent_contact_information,
                                           _id,
                                           index,
                                           setPupilsId,
                                           setDeleteModalOpen,
                                           setPupilsData,
                                           setIsOpen
                                       }) {
    const [open, setOpen] = useState(null);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const editFn = () => {
        setPupilsData({
            age,
            name,
            parent_contact_information,
            _id,
        })
        setIsOpen(true)
        handleCloseMenu();
    };

    const deleteFn = () => {
        setPupilsId(_id);
        setDeleteModalOpen(true);
        handleCloseMenu();
    };

    return (
        <>
            <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{formatPhoneNumber(parent_contact_information)}</TableCell>
                <TableCell>{age}</TableCell>
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
    );
}
