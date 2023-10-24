import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { useGetColorsQuery } from 'src/api/color-api-req';
import { useGetProductQuery } from 'src/api/product-api-req';
import { useGetCategoryQuery } from 'src/api/category-api.req';

import ProductCard from '../product-card';
import ProductFilters from '../product-filters';
import ProductCardLoader from '../product-card-loader';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [page, setPage] = useState(1);
  const { push } = useRouter();
  const [clonedData, setClonedData] = useState([]);
  const location = useLocation();
  const { data: categories } = useGetCategoryQuery({}, {});
  const { data: colors } = useGetColorsQuery({}, {});
  const { data, isLoading, isFetching } = useGetProductQuery(
    {
      page,
      query: location.search,
    },
    {}
  );

  const [openFilter, setOpenFilter] = useState(false);

  const productLoading = isLoading || isFetching;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const nextPage = () => {
    if (page <= data?.totalPages) setPage(page + 1);
  };

  useEffect(() => {
    if (data?.data) setClonedData([...data.data]);
    return () => {
      setClonedData([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const renderProductCard = (
    <Grid container spacing={3}>
      {productLoading
        ? new Array(8).fill(',').map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ProductCardLoader />
            </Grid>
          ))
        : clonedData.map((product) => (
            <Grid key={product._id} xs={12} sm={6} md={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
    </Grid>
  );

  return (
    <Container>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Mahsulotlar
        </Typography>
        <Button type="button" variant="contained" onClick={() => push('/new-product')}>
          Mahsulot qo&apos;shish
        </Button>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            colors={colors}
            categories={categories}
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            setClonedData={setClonedData}
          />
        </Stack>
      </Stack>
      {renderProductCard}
      {page < data?.totalPages && (
        <Button
          onClick={nextPage}
          variant="contained"
          sx={{
            marginTop: 3,
            display: 'block',
            marginX: 'auto',
          }}
        >
          Show More
        </Button>
      )}
    </Container>
  );
}
