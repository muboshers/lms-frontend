/* eslint-disable import/no-extraneous-dependencies */
import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Stack, IconButton, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import CustomCheckbox from 'src/components/checkbox/custom-checkbox';

// import { ColorPreview } from 'src/components/color-utils';

export default function ShopProductCard({ product, openFn }) {
  const [activeColor, setActiveColor] = useState(product?.color[0]);

  const handleColorChange = (event, col) => {
    setActiveColor(col);
  };

  const openDelModal = () => openFn(product?._id);

  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderImage = () => (
    <>
      {activeColor?.length === 1 ? (
        <Box
          component="img"
          alt={product.title}
          src={activeColor.images[0]}
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
          {activeColor.images?.map((imageURL) => (
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
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
          <Stack flexDirection="row" alignItems="center" gap={2.5}>
            {product?.color?.map((col) => (
              <CustomCheckbox
                key={col?.color?._id}
                color={col?.color?.color}
                htmlFor={col?.color?._id}
                withoutDefaultChecked
                checked={activeColor?.color?._id === col?.color?._id}
                onChange={(event) => handleColorChange(event, col)}
              />
            ))}
          </Stack>
          <IconButton color="error" onClick={openDelModal}>
            <Iconify icon="mdi:delete" />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
  openFn: PropTypes.func,
};
