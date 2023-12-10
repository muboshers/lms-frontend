import React, { useState } from 'react';

import {
  Card,
  Table,
  Button,
  Container,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { useGetTeacherListQuery } from 'src/api/teacher-api-req';

import Scrollbar from 'src/components/scrollbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import { ListHead, TableNoData, TableEmptyRows, TableRowLoader } from 'src/components/table';

import TeacherTableRow from '../teacher-table-row';
import TeacherAddEditModal from '../teacher-add-edit-modal';

export const TeacherListView = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isFetching } = useGetTeacherListQuery();
  const { totalCount, data: teacherData } = data || {};

  const TABLE_HEAD = [
    { label: 'N', alignRight: false },
    { label: "O'qituvchining ismi", alignRight: false },
    { label: 'Telefon raqami', alignRight: false },
    { label: "O'qituvchining yoshi", alignRight: false },
    { label: "O'quvchilar soni", alignRight: false },
    { label: "O'qituvchining daromadi", alignRight: false },
  ];

  const isNotFound = !teacherData || teacherData.length === 0;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (teacherData?.length || 0)) : 3;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onClose = () => setIsOpen(false);

  const loading = isLoading || isFetching;

  return (
    <>
      <Container>
        <CustomBreadcrumbs
          heading="O'qituvchilar"
          links={[{ name: "O'qituvchilar ro'yhati" }]}
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
          <Scrollbar>
            <TableContainer>
              <Table>
                <ListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {loading && <TableRowLoader columsNum={TABLE_HEAD.length} rowsNum={5} />}
                  {!loading && teacherData?.length === 0 && (
                    <TableNoData colsNum={TABLE_HEAD.length} query="O'qituvchilar topilmadi" />
                  )}
                  {!isNotFound &&
                    !loading &&
                    teacherData?.map((teacher, index) => (
                      <TeacherTableRow key={teacher?._id} {...teacher} index={index} />
                    ))}
                  <TableEmptyRows emptyRows={emptyRows} height={100} />
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
      <TeacherAddEditModal onClose={onClose} open={isOpen} />
    </>
  );
};
