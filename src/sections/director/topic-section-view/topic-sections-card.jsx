import React from 'react';
import PropTypes from "prop-types";

import IconButton from "@mui/material/IconButton";
import {Card, Stack, Typography} from "@mui/material";

import Iconify from "../../../components/iconify";

TopicSectionsCard.propTypes = {
    section: PropTypes.any,
    setSectionsData: PropTypes.func,
    setOpen: PropTypes.func,
    setSectionId: PropTypes.func,
    setDeleteWarning: PropTypes.func
}

export function TopicSectionsCard({
                                      section,
                                      setSectionsData,
                                      setOpen,
                                      setSectionId,
                                      setDeleteWarning
                                  }) {

    const handleEditFn = () => {
        setSectionsData(section)
        setOpen(true)
    }

    const handleDeleteFn = () => {
        setSectionId(section?._id)
        setDeleteWarning(true)
    }

    return (
        <Card sx={{
            padding: 2,
            marginTop: 2
        }}>
            <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2">
                    {section.name}
                </Typography>

                <Stack flexDirection="row" alignItems="center" gap={2}>
                    <IconButton type="button" onClick={handleEditFn}>
                        <Iconify icon="fe:edit" color="success.main"/>
                    </IconButton>
                    <IconButton type="button" onClick={handleDeleteFn}>
                        <Iconify icon="fluent:delete-12-regular" color="error.main"/>
                    </IconButton>
                </Stack>
            </Stack>
        </Card>
    );
}