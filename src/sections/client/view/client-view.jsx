import { useState } from 'react';

import {
  Card,
  Table,
  Stack,
  Container,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { useGetClientListQuery } from 'src/api/client-api-req';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import ClientTableRow from '../client-table-row';
import ClientTableHead from '../client-table-head';

// ----------------------------------------------------------------------

export default function ClientViewPage() {
  const [page, setPage] = useState(0);

  const { data } = useGetClientListQuery({
    page,
  });

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const notFound = !data?.data?.length;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Mijozlar ro&apos;yhati</Typography>
      </Stack>

      <Card
        sx={{
          padding: 1,
        }}
      >
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ClientTableHead
                headLabel={[
                  { id: 'client_name', label: 'Mijozning ismi' },
                  { id: 'name', label: 'Telefon raqami' },
                  { id: 'products_length', label: 'Umumiy bergan buyurtmalari soni' },
                  { id: 'registered_date', label: "A'zo bo'lgan sana" },
                ]}
              />
              <TableBody>
                {data?.data?.map((row) => (
                  <ClientTableRow key={row?._id} clientRow={row} />
                ))}
                {notFound && <TableNoData />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={data?.count || 1}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Qatorlar soni"
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
