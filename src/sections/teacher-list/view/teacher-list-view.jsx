import React, {useState, useDeferredValue} from 'react';

import {
    Card,
    Table,
    Button,
    Container,
    TableBody,
    TableContainer,
    TablePagination,
} from '@mui/material';

import {useGetTeacherListQuery} from 'src/api/teacher-api-req';

import Scrollbar from 'src/components/scrollbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import {ListHead, TableNoData, TableEmptyRows, TableRowLoader} from 'src/components/table';

import TeacherToolbar from "../teacher-toolbar";
import TeacherTableRow from '../teacher-table-row';
import {emptyRows} from "../../../utils/format-time";
import TeacherAddEditModal from '../teacher-add-edit-modal';
import TeacherListDeleteConfirm from '../teacher-delete-warning-modal';

export const TeacherListView = () => {
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("")
    const [teacherId, setTeacherId] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [teacherEditData, setTeacherEditData] = useState(null)
    const [isOpen, setIsOpen] = useState(false);

    const {data, isLoading, isFetching} = useGetTeacherListQuery({
        page,
        limit: rowsPerPage,
        search: useDeferredValue(searchTerm)
    });

    const {totalCount, data: teacherData} = data || {};

    const TABLE_HEAD = [
        {label: 'N', alignRight: false},
        {label: "O'qituvchining ismi", alignRight: false},
        {label: 'Telefon raqami', alignRight: false},
        {label: "O'qituvchining yoshi", alignRight: false},
        {label: "O'quvchilar soni", alignRight: false},
        {label: "O'qituvchining daromadi", alignRight: false},
    ];

    const isNotFound = !teacherData || teacherData.length === 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteModalClose = () => {
        setOpen(false);
        setTeacherId('');
    };

    const onClose = () => setIsOpen(false);

    const loading = isLoading || isFetching;

    return (
        <>
            <Container>
                <CustomBreadcrumbs
                    heading="O'qituvchilar"
                    links={[{name: "O'qituvchilar ro'yhati"}]}
                    action={
                        <Button
                            type="button"
                            variant="contained"
                            onClick={() => setIsOpen(true)}
                            size="large"
                            color="inherit"
                        >
                            O&apos;qituvchi qo&apos;shish
                        </Button>
                    }
                />

                <Card>
                    <TeacherToolbar
                        setSearchTerm={setSearchTerm}
                    />
                    <Scrollbar>
                        <TableContainer>
                            <Table>
                                <ListHead headLabel={TABLE_HEAD}/>
                                <TableBody>
                                    {loading && <TableRowLoader columsNum={TABLE_HEAD.length} rowsNum={5}/>}
                                    {!loading && teacherData?.length === 0 && (
                                        <TableNoData colsNum={TABLE_HEAD.length} query="O'qituvchilar topilmadi"/>
                                    )}
                                    {!isNotFound &&
                                        !loading &&
                                        teacherData?.map((teacher, index) => (
                                            <TeacherTableRow
                                                key={teacher?._id}
                                                {...teacher}
                                                index={index}
                                                setTeacherId={setTeacherId}
                                                setDeleteModalOpen={setOpen}
                                                setTeacherData={setTeacherEditData}
                                                setIsOpen={setIsOpen}
                                            />
                                        ))}
                                    <TableEmptyRows
                                        height={77}
                                        emptyRows={emptyRows(page, rowsPerPage, teacherData?.length)}
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
            <TeacherAddEditModal
                onClose={onClose}
                open={isOpen}
                teacherData={teacherEditData}
                setTeacherData={setTeacherEditData}
            />
            <TeacherListDeleteConfirm
                onClose={handleDeleteModalClose}
                teacherId={teacherId}
                open={open}
            />
        </>
    );
};
