import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {Popover, TableRow, MenuItem, TableCell, IconButton} from '@mui/material';

import Iconify from '../../components/iconify';
import {fCurrency, formatPhoneNumber} from "../../utils/format-number";

TeacherTableRow.propTypes = {
    age: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    pupils_count: PropTypes.number.isRequired,
    teacher_income: PropTypes.number.isRequired,
    phone_number: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    setTeacherId: PropTypes.func,
    login: PropTypes.string,
    setDeleteModalOpen: PropTypes.func,
    setTeacherData: PropTypes.func,
    setIsOpen: PropTypes.func
};

export default function TeacherTableRow({
                                            age,
                                            name,
                                            phone_number,
                                            pupils_count,
                                            teacher_income,
                                            _id,
                                            index,
                                            setTeacherId,
                                            login,
                                            setDeleteModalOpen,
                                            setTeacherData,
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
        setTeacherData({
            age,
            name,
            pupils_count,
            teacher_income,
            phone_number,
            login,
            _id,
        })
        setIsOpen(true)
        handleCloseMenu();
    };

    const deleteFn = () => {
        setTeacherId(_id);
        setDeleteModalOpen(true);
        handleCloseMenu();
    };

    return (
        <>
            <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{formatPhoneNumber(phone_number)}</TableCell>
                <TableCell>{age}</TableCell>
                <TableCell>{pupils_count}</TableCell>
                <TableCell>{fCurrency(teacher_income, '0,0.00')}</TableCell>
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
                anchorOrigidn={{vertical: 'top', horizontal: 'left'}}
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
