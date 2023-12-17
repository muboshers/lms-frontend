import React, {useState, useDeferredValue} from 'react';

import {Card, Table, Button, Container, TableBody, TableContainer, TablePagination,} from '@mui/material';

import Scrollbar from 'src/components/scrollbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import {ListHead, TableNoData, TableEmptyRows, TableRowLoader} from 'src/components/table';

import PupilsToolbar from "../pupils-toolbar";
import PupilsTableRow from '../pupils-table-row';
import {emptyRows} from "../../../../utils/format-time";
import PupilsAddEditModal from '../pupils-add-edit-modal';
import {useGetPupilsListQuery} from "../../../../api/pupils-api-req";
import PupilsListDeleteConfirm from "../pupils-delete-warning-modal";

export const PupilsListView = () => {
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("")
    const [pupilsId, setPupilsId] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [pupilsEditData, setPupilsEditData] = useState(null)
    const [isOpen, setIsOpen] = useState(false);

    const {data, isLoading, isFetching} = useGetPupilsListQuery({
        page,
        limit: rowsPerPage,
        search: useDeferredValue(searchTerm)
    });

    const {totalCount, data: pupilsData} = data || {};

    const TABLE_HEAD = [
        {label: 'N', alignRight: false},
        {label: "O'quvchining ismi", alignRight: false},
        {label: 'Telefon raqami', alignRight: false},
        {label: "O'quvchining yoshi", alignRight: false},
    ];

    const isNotFound = !pupilsData || pupilsData.length === 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteModalClose = () => {
        setOpen(false);
        setPupilsId('');
    };

    const onClose = () => setIsOpen(false);

    const loading = isLoading || isFetching;

    return (
        <>
            <Container>
                <CustomBreadcrumbs
                    heading="O'quvchilar"
                    links={[{name: "O'quvchilar ro'yhati"}]}
                    action={
                        <Button
                            type="button"
                            variant="contained"
                            onClick={() => setIsOpen(true)}
                            size="large"
                            color="inherit"
                        >
                            O&apos;quvchi qo&apos;shish
                        </Button>
                    }
                />

                <Card>
                    <PupilsToolbar
                        setSearchTerm={setSearchTerm}
                    />
                    <Scrollbar>
                        <TableContainer>
                            <Table>
                                <ListHead headLabel={TABLE_HEAD}/>
                                <TableBody>
                                    {loading && <TableRowLoader columsNum={TABLE_HEAD.length} rowsNum={5}/>}
                                    {!loading && pupilsData?.length === 0 && (
                                        <TableNoData colsNum={TABLE_HEAD.length} query="O'quvchilar topilmadi"/>
                                    )}
                                    {!isNotFound &&
                                        !loading &&
                                        pupilsData?.map((teacher, index) => (
                                            <PupilsTableRow
                                                key={teacher?._id}
                                                {...teacher}
                                                index={index}
                                                setPupils={setPupilsId}
                                                setDeleteModalOpen={setOpen}
                                                setPupilsData={setPupilsEditData}
                                                setIsOpen={setIsOpen}
                                            />
                                        ))}
                                    <TableEmptyRows
                                        height={77}
                                        emptyRows={emptyRows(page, rowsPerPage, pupilsData?.length)}
                                    />
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                labelRowsPerPage="Qatorlar soni"
                                count={totalCount || 1}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </Scrollbar>
                </Card>
            </Container>
            <PupilsAddEditModal
                onClose={onClose}
                open={isOpen}
                pupilsData={pupilsEditData}
                setPupilsData={setPupilsEditData}
            />
            <PupilsListDeleteConfirm
                onClose={handleDeleteModalClose}
                pupilsId={pupilsId}
                open={open}
            />
        </>
    );
};
