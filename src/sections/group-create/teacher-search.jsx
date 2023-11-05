/* eslint-disable react/jsx-no-useless-fragment */
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import { Box, Card, MenuItem, TextField } from "@mui/material";

import { TEACHER } from "src/api/url";
import { axiosInstance } from "src/api";

import Scrollbar from "src/components/scrollbar";

TeacherSearch.propTypes = {
  name: PropTypes.string,
  setValue: PropTypes.any,
};

export default function TeacherSearch({ name, setValue }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [teacherListData, setTeacherListData] = useState([]);

  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const getTeacherData = setTimeout(async () => {
      try {
        const query = searchTerm ? `?search=${searchTerm}` : "";
        const teacherList = await axiosInstance.get(
          `${TEACHER.GET_LIST}${query}`
        );

        setTeacherListData(teacherList?.data?.data ?? []);
      } catch (error) {
        console.log(error.message);
      }
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => clearTimeout(getTeacherData);
  }, [searchTerm]);

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        zIndex: 10,
      }}
    >
      <TextField
        label="O'qituvchini qidiring"
        value={searchTerm}
        fullWidth
        onChange={(event) => setSearchTerm(event.target.value)}
        onFocus={() => setIsFocus(true)}
      />

      {teacherListData?.length > 0 && isFocus && (
        <Card
          sx={{
            maxHeight: "120px",
            position: "absolute",
            width: "100%",
            borderRadius: "8px",
            marginTop: "10px",
          }}
        >
          <Scrollbar>
            {teacherListData.map((teacher) => (
              <MenuItem
                key={teacher._id}
                onClick={() => {
                  setSearchTerm(teacher.name);
                  setValue(name, teacher?._id);
                  setIsFocus(false);
                }}
              >
                {teacher.name} {teacher?.phone_number}
              </MenuItem>
            ))}
          </Scrollbar>
        </Card>
      )}
    </Box>
  );
}
