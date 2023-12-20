// eslint-disable-entire-file jsx-a11y/no-static-element-interactions
import PropTypes from "prop-types";
import React, {useState} from 'react';

import IconButton from "@mui/material/IconButton";
import {Box, Card, Stack, Typography} from "@mui/material";

import Iconify from "../../../components/iconify";

TopicSectionsCard.propTypes = {
    section: PropTypes.any,
    setSectionsData: PropTypes.func,
    setOpen: PropTypes.func,
    setSectionId: PropTypes.func,
    setDeleteWarning: PropTypes.func,
    provided: PropTypes.any
}

export function TopicSectionsCard({
                                      section,
                                      setSectionsData,
                                      setOpen,
                                      setSectionId,
                                      setDeleteWarning,
                                      provided
                                  }) {

    const [isOpen, setIsOpen] = useState(false)

    const handleEditFn = () => {
        setSectionsData(section)
        setOpen(true)
    }

    const handleDeleteFn = () => {
        setSectionId(section?._id)
        setDeleteWarning(true)
    }

    const handleOpen = () =>
        setIsOpen(!isOpen)


    const isHasReports = section?.reports?.length >= 1

    return (
        <Stack flexDirection="row" alignItems="flex-start" gap={2}
               ref={provided.innerRef}
               {...provided.draggableProps}
        >

            <Box sx={{
                paddingTop: "40px"
            }}>
                <Box
                    {...provided.dragHandleProps}
                >
                    <Iconify
                        icon="icon-park-outline:drag"/>
                </Box>
            </Box>

            <Card sx={{
                padding: 2,
                marginTop: 2,
                width: "100%",
                maxHeight: isOpen ? "1200px" : "70px",
                transition: ".3s ease"
            }}
            >
                <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Stack flexDirection="row">
                        <Typography variant="subtitle2">
                            {section.name}
                        </Typography>
                    </Stack>

                    <Stack flexDirection="row" alignItems="center" gap={2}>
                        <IconButton type="button" onClick={handleEditFn}>
                            <Iconify icon="fe:edit" color="success.main"/>
                        </IconButton>
                        <IconButton type="button" onClick={handleDeleteFn}>
                            <Iconify icon="fluent:delete-12-regular" color="error.main"/>
                        </IconButton>
                        {isHasReports && (
                            <button
                                onClick={handleOpen}
                                style={{
                                    cursor: "pointer",
                                    fontSize: "12px",
                                    background: "transparent",
                                    outline: "none",
                                    border: "none"
                                }}
                                type="button"
                            >
                                Natijalarni ko&apos;rish
                            </button>
                        )}
                    </Stack>
                </Stack>

                {section?.reports?.map(report => (
                    <Stack paddingLeft={2} paddingY={2} flexDirection="row" justifyContent="space-between"
                           alingItems="center" key={report._id}>
                        <Stack flexDirection="row" alignItems="center">
                            <Typography fontSize={14} color={report.type === "GOOD" ? 'success.main' : "error.main"}>
                                {report?.message}
                            </Typography>
                        </Stack>
                        <Typography fontSize={14}>
                            {report?.pupil_id?.name}
                        </Typography>
                    </Stack>
                ))}
            </Card>
        </Stack>

    );
}