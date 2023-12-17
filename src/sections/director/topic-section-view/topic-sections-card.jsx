import React from 'react';
import PropTypes from "prop-types";

import {Card, Typography} from "@mui/material";

TopicSectionsCard.propTypes = {
    section: PropTypes.any
}

export function TopicSectionsCard({section}) {
    return (
        <Card sx={{
            padding: 2,
            marginTop: 2
        }}>
            <Typography variant="subtitle2">
                {section.name}
            </Typography>
        </Card>
    );
}