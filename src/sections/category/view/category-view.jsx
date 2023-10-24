import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Table,
  Container,
  TableBody,
  IconButton,
  Typography,
  TableContainer,
} from '@mui/material';

import { useGetCategoryQuery } from 'src/api/category-api.req';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import TableNoData from '../table-no-data';
import CategoryForm from '../category-form';
import CategoryTableRow from '../category-table-row';
import CategoryTableHead from '../category-table-head';
import CategoryDeleteModal from '../category-delete-modal';

// ----------------------------------------------------------------------

export default function CategoryPage({ categoryId }) {
  const { data } = useGetCategoryQuery({
    id: categoryId,
  });

  const [open, setOpen] = useState(false);

  const [editData, setEditData] = useState(null);
  const [id, setId] = useState(null);
  const [openDelModal, setOpenDelModal] = useState(false);

  const modalOpen = () => setOpen(true);

  const handleModalClose = () => {
    setOpen(false);
    setEditData(null);
  };

  console.log(data);

  const notFound = categoryId ? !data?.children?.length : !data?.length;

  return (
    <>
      <Container>
        <CustomBreadcrumbs
          heading="Kategoriyalar"
          links={[{ name: "Kategoriyar ro'yhati" }]}
          action={
            <IconButton variant="contained" color="primary" type="button" onClick={modalOpen}>
              <Iconify icon="eva:plus-fill" />
            </IconButton>
          }
        />

        <Card
          sx={{
            padding: 1,
          }}
        >
          {data?.name && (
            <Typography
              variant="h6"
              sx={{
                padding: 2,
              }}
            >
              {data?.name} kategoriyalari
            </Typography>
          )}

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <CategoryTableHead
                  headLabel={[
                    { id: 'name', label: 'Kategoriya nomi' },
                    { id: 'childen', label: 'Ichki kategoriyalar soni' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {categoryId
                    ? data?.children?.map((row) => (
                        <CategoryTableRow
                          openFn={modalOpen}
                          openDlModal={() => setOpenDelModal(true)}
                          key={row?._id}
                          categoryRow={row}
                          setId={setId}
                          setEditData={setEditData}
                        />
                      ))
                    : data?.map((row) => (
                        <CategoryTableRow
                          openFn={modalOpen}
                          openDlModal={() => setOpenDelModal(true)}
                          key={row?._id}
                          categoryRow={row}
                          setId={setId}
                          setEditData={setEditData}
                        />
                      ))}

                  {notFound && <TableNoData />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
      <CategoryForm open={open} onClose={handleModalClose} editData={editData} id={categoryId} />
      <CategoryDeleteModal
        id={id}
        setId={setId}
        open={openDelModal}
        onClose={() => setOpenDelModal(false)}
      />
    </>
  );
}

//------------------------------------------------------

CategoryPage.propTypes = {
  categoryId: PropTypes.any,
};
