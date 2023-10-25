import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Table,
  Stack,
  Container,
  TableBody,
  IconButton,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { useGetColorsQuery } from 'src/api/color-api-req';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import ColorForm from '../color-form';
import TableNoData from '../table-no-data';
import ColorTableRow from '../color-table-row';
import ColorTableHead from '../category-table-head';
import ColorDeleteModal from '../color-delete-modal';

// ----------------------------------------------------------------------

export default function ColorViewPage({ categoryId }) {
  const { data } = useGetColorsQuery();
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const [open, setOpen] = useState(false);

  const [editData, setEditData] = useState(null);
  const [id, setId] = useState(null);
  const [openDelModal, setOpenDelModal] = useState(false);

  const modalOpen = () => setOpen(true);

  const handleModalClose = () => {
    setOpen(false);
    setEditData(null);
  };

  const notFound = !data?.length;

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Ranglar</Typography>

          <IconButton variant="contained" color="primary" type="button" onClick={modalOpen}>
            <Iconify icon="eva:plus-fill" />
          </IconButton>
        </Stack>

        <Card
          sx={{
            padding: 1,
          }}
        >
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <ColorTableHead
                  headLabel={[
                    { id: 'name', label: 'Rang' },
                    { id: 'name', label: 'Rang nomi' },
                    { id: 'childen', label: 'Yaratilgan sana' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <ColorTableRow
                      openFn={modalOpen}
                      openDlModal={() => setOpenDelModal(true)}
                      key={row?._id}
                      colorRow={row}
                      setId={setId}
                      setEditData={setEditData}
                    />
                  ))}
                  {notFound && <TableNoData />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={data?.length || 1}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            labelRowsPerPage="Qatorlar soni"
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <ColorForm open={open} onClose={handleModalClose} editData={editData} id={categoryId} />
      <ColorDeleteModal
        id={id}
        setId={setId}
        open={openDelModal}
        onClose={() => setOpenDelModal(false)}
      />
    </>
  );
}

//------------------------------------------------------

ColorViewPage.propTypes = {
  categoryId: PropTypes.any,
};
