import { debounce } from "lodash";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, TextField } from "@mui/material";

import { spaceToSlash } from "src/utils/string";

// import { TEACHING_CENTER_DASHBOARD_PATH } from "src/routes/path";

function GroupListSearch() {
  const [isFocus, setIsFocus] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const debouncedSearch = debounce(async (search) => {
    const query = !search ? "" : `?search=${search}`;
    navigate(`${spaceToSlash(query)}`);
  }, 1000);

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchTerm(value);

    debouncedSearch(value);
  };

  return (
    <Box
      sx={{
        marginBottom: 3,
      }}
    >
      <TextField
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange}
        value={searchTerm}
        label="Guruh nomi bo'yicha qidirish"
        fullWidth
        sx={{
          maxWidth: isFocus ? "300px" : "240px",
          transition: ".4s ease",
        }}
      />
    </Box>
  );
}

export default GroupListSearch;
