import PropTypes from "prop-types";
import React, {useState, useEffect} from 'react';

import {Box, TextField} from "@mui/material";

PupilsToolbar.propTypes = {
    setSearchTerm: PropTypes.func
}

export default function PupilsToolbar({setSearchTerm}) {
    const [search, setSearch] = useState("")


    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setSearchTerm(search)
        }, 500)

        return () => clearTimeout(timeOutId)
        // eslint-disable-next-line
    }, [search])

    return (
        <Box sx={{
            padding: 2
        }}>
            <TextField
                fullWidth
                label="Qidirsh..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
        </Box>
    );
}
