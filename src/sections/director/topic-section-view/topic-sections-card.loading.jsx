import React from 'react';

import {Card, Skeleton} from "@mui/material";

export function TopicSectionsCardLoading() {
    return (
        <Card sx={{
            padding: 2,
            marginTop: 2
        }}>
            <Skeleton
                animation="wave"
                variant="text"
                width={120}
            />
        </Card>
    );
}
