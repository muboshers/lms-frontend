import PropTypes from "prop-types";
import React, {useState} from 'react';

import IconButton from "@mui/material/IconButton";
import {Card, Stack, Table, TableBody, Typography, TableContainer, TablePagination} from "@mui/material";

import PupilsTableRow from "../pupils-table-row";
import Iconify from "../../../../../components/iconify";
import PupilsTableToolbar from "../pupils-table-toolbar";
import PupilsAddEditModal from "../pupils-add-edit-modal";
import Scrollbar from "../../../../../components/scrollbar";
import PupilsDeleteWarningModal from "../pupils-delete-warning-modal";
import {ListHead, TableNoData, TableRowLoader} from "../../../../../components/table";

PupilsView.propTypes = {
    page: PropTypes.number,
    setPage: PropTypes.func,
    setSearch: PropTypes.func,
    rowsPerPage: PropTypes.number,
    setRowsPerPage: PropTypes.func,
    loading: PropTypes.bool,
    data: PropTypes.any

}

function PupilsView({
                        data,
                        page,
                        setPage,
                        rowsPerPage,
                        setRowsPerPage,
                        setSearch,
                        loading,

                    }) {
    const [pupilsId, setPupilsId] = useState('');
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [pupilsData, setPupilsData] = useState(null)
    const [isOpen, setIsOpen] = useState(false)


    const {data: pupilsList, totalCount} = data || {}

    const TABLE_HEAD = [
        {label: 'N', alignRight: false},
        {label: "O'quvchining ismi", alignRight: false},
        {label: 'Ota-onasining Telefon raqami', alignRight: false},
        {label: "O'quvchining yoshi", alignRight: false},
    ];


    const notFound = pupilsList?.length === 0 || !pupilsList?.length


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const modalClose = () => setIsOpen(false)

    const handleDeleteModalClose = () => {
        setDeleteOpen(false);
        setPupilsId('');
    };

    const openDeleteFn = (row) => {
        setPupilsId(row._id)
        setDeleteOpen(true)
    }

    return (
        <>
            <Card>
                <Stack flexDirection="row" alignItems="center" padding={2} sx={{
                    justifyContent: "space-between"
                }}>
                    <Typography variant="h5">
                        O&apos;quvchilar ro&apos;yhati
                    </Typography>
                    <IconButton onClick={() => setIsOpen(true)}>
                        <Iconify icon="gala:add" color="primary.main"/>
                    </IconButton>
                </Stack>
                <PupilsTableToolbar setSearchTerm={setSearch}/>
                <Scrollbar>
                    <TableContainer>
                        <Table>
                            <ListHead headLabel={TABLE_HEAD}/>
                            <TableBody>
                                {loading && (
                                    <TableRowLoader columsNum={TABLE_HEAD.length} rowsNum={5}/>
                                )}

                                {!loading && notFound ? (
                                    <TableNoData colsNum={TABLE_HEAD.length} query="O'qituvchilar topilmadi"/>
                                ) : !loading && pupilsList?.map((pupils, index) => (
                                    <PupilsTableRow
                                        key={pupils._id}
                                        row={pupils}
                                        index={index + 1}
                                        deleteFn={() => openDeleteFn(pupils)}
                                        setIsOpen={setIsOpen}
                                        setPupilsData={setPupilsData}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        labelRowsPerPage="Qatorlar soni"
                        page={page}
                        count={totalCount || 1}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Scrollbar>
            </Card>

            <PupilsAddEditModal
                open={isOpen}
                onClose={modalClose}
                pupilsData={pupilsData}
                setPupilsData={setPupilsData}
            />
            <PupilsDeleteWarningModal
                open={isDeleteOpen}
                onClose={handleDeleteModalClose}
                pupilsId={pupilsId}
            />
        </>

    );
}

export default PupilsView;