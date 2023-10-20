import { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import {
  Box,
  Stack,
  Button,
  Drawer,
  Divider,
  Checkbox,
  FormGroup,
  Typography,
  IconButton,
  FormControlLabel,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomCheckbox from 'src/components/checkbox/custom-checkbox';

// ----------------------------------------------------------------------

export default function ProductFilters({
  openFilter,
  onOpenFilter,
  onCloseFilter,
  setClonedData,
  categories,
  colors,
}) {
  const { push } = useRouter();
  const location = useLocation();
  const [categoriesSearch, setCategoriesSearch] = useState([]);
  const [colorSearch, setColorSearch] = useState([]);

  const catOnChange = (event, id, index) => {
    const isChecked = event.target.checked;

    setCategoriesSearch((prevCategoriesSearch) => {
      const clonedCategoriesSearch = [...prevCategoriesSearch];

      if (isChecked) {
        clonedCategoriesSearch.splice(index, 0, id);
      } else {
        const catIndex = clonedCategoriesSearch.indexOf(id);
        if (catIndex !== -1) {
          clonedCategoriesSearch.splice(catIndex, 1);
        }
      }
      return clonedCategoriesSearch;
    });
  };

  const colorOnChange = (event, id, index) => {
    const isChecked = event.target.checked;
    setColorSearch((prevColorSearch) => {
      const clonedColorSearch = [...prevColorSearch];

      if (isChecked) {
        clonedColorSearch.splice(index, 0, id);
      } else {
        const catIndex = clonedColorSearch.indexOf(id);
        if (catIndex !== -1) {
          clonedColorSearch.splice(catIndex, 1);
        }
      }
      return clonedColorSearch;
    });
  };

  const resetFilter = () => {
    setCategoriesSearch([]);
    setColorSearch([]);
    push('/products');
  };

  const handleNavigateSearch = () => {
    let categoryQuery = '';
    let colorQuery = '';

    if (categoriesSearch.length >= 1) {
      categoriesSearch
        .filter((item) => !!item)
        .forEach((categoryId) => {
          categoryQuery += `categoryId=${categoryId}&`;
        });
    }
    if (colorSearch.length >= 1) {
      colorSearch
        .filter((item) => !!item)
        .forEach((color) => {
          colorQuery += `color=${color}&`;
        });
    }

    push(`/products?${categoryQuery}${colorQuery}`);
    setClonedData([]);
  };
  const renderCategory = (
    <>
      {categories && (
        <Stack spacing={1}>
          <Typography variant="subtitle2">Kategoriyalar</Typography>
          <FormGroup>
            <Scrollbar>
              <Box
                sx={{
                  height: '200px',
                }}
              >
                {categories.map((cat, index) => (
                  <FormControlLabel
                    onChange={(event) => catOnChange(event, cat?._id, index)}
                    key={cat?._id}
                    control={<Checkbox />}
                    checked={
                      categoriesSearch?.includes(cat?._id) || location.search.includes(cat?._id)
                    }
                    label={cat?.name}
                  />
                ))}
              </Box>
            </Scrollbar>
          </FormGroup>
        </Stack>
      )}
    </>
  );

  const renderColors = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Ranglar</Typography>

      <Stack flexDirection="row" gap={2} alignItems="center" flexWrap="wrap">
        {colors?.map((color, index) => (
          <CustomCheckbox
            key={color?._id}
            htmlFor={color?._id}
            color={color?.color}
            onChange={(event) => colorOnChange(event, color?._id, index)}
            checked={colorSearch.includes(color?._id) || location.search.includes(color?._id)}
          />
        ))}
      </Stack>
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        Qidirish&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="h6" sx={{ ml: 1 }}>
            Qidirish
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            {renderCategory}

            {renderColors}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="contained"
            onClick={handleNavigateSearch}
            startIcon={<Iconify icon="ic:search" />}
            sx={{
              mb: 1,
            }}
          >
            Qidirish
          </Button>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={resetFilter}
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Qidiruvni tozalash
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

ProductFilters.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  setClonedData: PropTypes.func,
  categories: PropTypes.any,
  colors: PropTypes.any,
};
