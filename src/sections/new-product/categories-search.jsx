/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Card, MenuItem, TextField } from '@mui/material';

import { baseURL } from 'src/contants';
import { axiosInstance } from 'src/api';

import Scrollbar from 'src/components/scrollbar';

export default function CategorySearch({ index }) {
  const { setValue, watch } = useFormContext();

  const [searchTerm, setSearchTerm] = useState('');

  const [isFocus, setIsFocus] = useState(false);

  const categoryId = watch(`categories.${index}.categoryId`);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchIndustry = setTimeout(async () => {
      try {
        let url = `${baseURL}category/admin-list`;
        if (searchTerm) url += `?search=${searchTerm}`;
        const res = await axiosInstance.get(url);
        setData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }, 500);
    setValue('', categoryId ?? '');
    return () => clearTimeout(fetchIndustry);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, categoryId]);

  return (
    <>
      <TextField
        fullWidth
        placeholder="Kategoriyani qidirish"
        onFocus={() => setIsFocus(true)}
        value={searchTerm}
        onChange={(e) => {
          if (!e.target.value) {
            setValue(`categories.${index}.categoryId`, '');
          }

          setSearchTerm(e.target.value);
        }}
      />

      {data?.length > 1 && isFocus && (
        <Card
          sx={{
            height: 120,
          }}
        >
          <Scrollbar>
            {data?.map((cat) => (
              <MenuItem
                key={cat?._id}
                onClick={() => {
                  setValue(`categories.${index}.categoryId`, cat._id);
                  setSearchTerm(cat?.name);
                  setIsFocus(false);
                }}
              >
                {cat?.name}
              </MenuItem>
            ))}
          </Scrollbar>
        </Card>
      )}
    </>
  );
}
