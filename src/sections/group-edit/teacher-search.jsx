/* eslint-disable react/jsx-no-useless-fragment */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Box, Card, MenuItem } from '@mui/material';

import { TEACHER } from 'src/api/url';
import { axiosInstance } from 'src/api';

import Scrollbar from 'src/components/scrollbar';
import { RHFTextField } from 'src/components/hook-form';

TeacherSearch.propTypes = {
  name: PropTypes.string,
  setValue: PropTypes.any,
  watch: PropTypes.func,
};

export default function TeacherSearch({ name, setValue, watch }) {
  const [teacherListData, setTeacherListData] = useState([]);

  const [isFocus, setIsFocus] = useState(false);

  const searchTerm = watch(`${name}.name`);

  useEffect(() => {
    const getTeacherData = setTimeout(async () => {
      try {
        if (!isFocus) return;
        const query = searchTerm ? `?search=${searchTerm}` : '';
        const teacherList = await axiosInstance.get(`${TEACHER.GET_LIST}${query}`);

        setTeacherListData(teacherList?.data?.data ?? []);
      } catch (error) {
        console.log(error.message);
      }
    }, 2000);
    return () => clearTimeout(getTeacherData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);
  useEffect(() => {
    const handleClose = () => setIsFocus(false);

    document.addEventListener('click', handleClose);

    return () => {
      document.removeEventListener('click', handleClose);
    };
  }, [isFocus]);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        zIndex: 10,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <RHFTextField
        label="O'qituvchini qidiring"
        name={`${name}.name`}
        onFocus={() => setIsFocus(true)}
        fullWidth
      />

      {teacherListData?.length > 0 && isFocus && (
        <Card
          sx={{
            maxHeight: '120px',
            position: 'absolute',
            width: '100%',
            borderRadius: '8px',
            marginTop: '10px',
          }}
        >
          <Scrollbar>
            {teacherListData?.map((teacher) => (
              <MenuItem
                key={teacher._id}
                onClick={() => {
                  setValue(`${name}.id`, teacher?._id);
                  setValue(`${name}.name`, teacher?.name);
                  setIsFocus(false);
                }}
              >
                {teacher?.name}
              </MenuItem>
            ))}
          </Scrollbar>
        </Card>
      )}
    </Box>
  );
}
