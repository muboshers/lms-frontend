/* eslint-disable import/no-extraneous-dependencies */
import 'swiper/css';
import 'swiper/css/pagination';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';

import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// import { fCurrency } from 'src/utils/format-number';

import { Link } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper/modules';

import { Stack, Typography } from '@mui/material';

// import { ColorPreview } from 'src/components/color-utils';

export default function ShopProductCard({ product }) {
  console.log(product?.color);
  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderImage = () => (
    <>
      {product?.image?.length === 1 ? (
        <Box
          component="img"
          alt={product.title}
          src={product.image[0]}
          sx={{
            top: 0,
            width: 1,
            height: 1,
            objectFit: 'cover',
            position: 'absolute',
          }}
        />
      ) : (
        <Swiper
          className="swiper"
          style={{
            position: 'absolute',
            top: 0,
          }}
          autoplay={{
            delay: 1500,
          }}
          pagination
          modules={[Pagination, Autoplay]}
        >
          {product?.image?.map((imageURL) => (
            <SwiperSlide key={imageURL}>
              <Box
                component="img"
                alt={product?.title}
                src={imageURL}
                sx={{
                  top: 0,
                  width: 1,
                  height: 1,
                  objectFit: 'cover',
                  position: 'absolute',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <RenderImage />
      </Box>

      <Stack spacing={1} sx={{ p: 2 }}>
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
          <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
            {product.title}
          </Link>
          <Typography
            sx={{
              fontSize: '13px',
            }}
          >
            {product?.categoryId[0]?.name}
          </Typography>
        </Stack>
        {`${
          product?.description.length > 25
            ? product?.description?.slice(0, 25)
            : product?.description
        }...`}
        <div
          style={{
            display: 'block',
            background: product?.color?.color,
            width: '25px',
            height: '25px',
            borderRadius: '12px',
          }}
        />
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
