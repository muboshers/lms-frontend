import { debounce } from 'lodash';
import { useState, useEffect, useCallback } from 'react';

import {
  Card,
  Table,
  Stack,
  Tooltip,
  Container,
  TableBody,
  TextField,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { useGetOrderListQuery, useGetOrderReportExcelMutation } from 'src/api/order-api-req';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import OrderTableRow from '../order-table-row';
import OrderTableHead from '../order-table-head';

// ----------------------------------------------------------------------

export default function OrderViewPage() {
  const [page, setPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');

  const [inputVal, setInputVal] = useState('');

  const [getReportExcel, reportRes] = useGetOrderReportExcelMutation();

  const { data, isLoading, isFetching } = useGetOrderListQuery(
    {
      page,
      search: searchTerm,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const downloadReport = async () => {
    const a = document.createElement('a');

    await getReportExcel()
      .unwrap()
      .then((res) => {
        a.href = res.url;
        a.download = res.name;
        a.click();
      });
  };

  const notFound = !data?.data?.length;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((search) => {
      setSearchTerm(search);
    }, 1000),
    []
  );

  useEffect(() => {
    handleSearch(inputVal);
  }, [inputVal, handleSearch]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Buyurtmalar ro&apos;yhati</Typography>
      </Stack>

      <Card
        sx={{
          padding: 1,
        }}
      >
        <Stack paddingY={1} flexDirection="row" alignItems="center" justifyContent="space-between">
          <TextField
            placeholder="Buyurtmalarni qidirish"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <Tooltip title="Hisobotni excel sifatida yuklab olish">
            <IconButton onClick={downloadReport} disabled={reportRes.isLoading}>
              <Iconify icon="file-icons:microsoft-excel" />
            </IconButton>
          </Tooltip>
        </Stack>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <OrderTableHead
                headLabel={[
                  { id: 'client_name', label: 'Mijozning ismi' },
                  { id: 'name', label: 'Telefon raqami' },
                  { id: 'products_length', label: 'Mahsulot nomi' },
                  { id: 'registered_date', label: 'Buyurtma berilgan sana' },
                  { id: 'status', label: 'Buyurtma holati' },
                ]}
              />
              <TableBody>
                {data?.data?.map((row) => (
                  <OrderTableRow
                    key={row?._id}
                    orderRow={row}
                    isLoading={isLoading || isFetching}
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
          count={data?.count || 1}
          rowsPerPage={10}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[]}
          labelRowsPerPage="Qatorlar soni"
        />
      </Card>
    </Container>
  );
}
