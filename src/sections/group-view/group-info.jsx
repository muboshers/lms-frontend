import React from 'react';
import PropTypes from "prop-types";

import {Typography} from "@mui/material";

GroupInfo.propTypes = {
    name: PropTypes.string,
}

export function GroupInfo({name,}) {
    return (
        <Typography variant="h4">
            {name}
        </Typography>
    );
}
