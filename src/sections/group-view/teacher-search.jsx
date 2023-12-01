/* eslint-disable func-names */
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

import { Box, Card, MenuItem, TextField } from '@mui/material';

import { TEACHER } from 'src/api/url';
import { axiosInstance } from 'src/api';

import Scrollbar from 'src/components/scrollbar';

TeacherSearch.propTypes = {
  name: PropTypes.string,
  setValue: PropTypes.any,
  defaultValue: PropTypes.string,
};

export default function TeacherSearch({ name, setValue, defaultValue }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [teacherListData, setTeacherListData] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(async (term) => {
      try {
        const query = term ? `?search=${term}` : '';
        const teacherList = await axiosInstance.get(`${TEACHER.GET_LIST}${query}`);
        setTeacherListData(teacherList?.data?.data ?? []);
      } catch (error) {
        console.error(error.message);
      }
    }, 2000),
    []
  );

  useEffect(() => {
    const handleClickOutside = () => {
      if (isFocus) {
        setIsFocus(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isFocus]);

  useEffect(() => {
    setSearchTerm(defaultValue);
  }, [defaultValue]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setIsFocus(true);
    debouncedSearch(value);
  };

  const handleMenuItemClick = (teacher) => (event) => {
    event.stopPropagation();
    setSearchTerm(teacher.name);
    setValue(name, teacher?._id);
    setIsFocus(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <TextField
        label="O'qituvchini qidiring"
        value={searchTerm}
        fullWidth
        onChange={handleInputChange}
        onFocus={() => setIsFocus(true)}
        onClick={(event) => event.stopPropagation()}
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
            {teacherListData.map((teacher) => (
              <MenuItem key={teacher._id} onClick={handleMenuItemClick(teacher)}>
                {teacher.name} {teacher?.phone_number}
              </MenuItem>
            ))}
          </Scrollbar>
        </Card>
      )}
    </Box>
  );
}

// Debounce function
function debounce(callback, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
