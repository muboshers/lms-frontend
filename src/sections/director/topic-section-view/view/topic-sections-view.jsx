import React, {useState} from 'react';
import {useParams} from "react-router-dom";

import {Box, Stack, Button, Container, Pagination} from "@mui/material";

import {TopicSectionsCard} from "../topic-sections-card";
import {SectionAddEditForm} from "../section-add-edit-form";
import {TEACHING_CENTER_DASHBOARD_PATH} from "../../../../routes/path";
import {TopicSectionsCardLoading} from "../topic-sections-card.loading";
import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";
import {useGetSectionsListByTopicIdQuery} from "../../../../api/topic-api-req";
import TopicSectionDeleteWarningModal from "../topic-section-delete-warning-modal";

export function TopicSectionsView() {
    const {id,} = useParams()

    const [page, setPage] = useState(1)

    const [open, setOpen] = useState(false)

    const [sectionsData, setSectionsData] = useState(null)

    const [deleteWarning, setDeleteWarning] = useState(false)

    const [sectionId, setSectionId] = useState(null)

    const {data, isLoading, isFetching} = useGetSectionsListByTopicIdQuery({
        id,
        page,
    })

    const onClose = () => {
        setOpen(false)
        setSectionsData(null)
    }

    const delOnClose = () => {
        setDeleteWarning(false)
        setSectionId(null)
    }

    const loading = isLoading || isFetching


    return (
        <>
            <Container>
                <CustomBreadcrumbs
                    heading="Bo'limlari"
                    links={[
                        {name: "O'quvchilar ro'yhati", href: `${TEACHING_CENTER_DASHBOARD_PATH.TOPIC_VIEW}/${id}`},
                        {name: "Bo'limlar ro'yhati"},
                    ]}
                    action={<Button size="medium" variant="contained" color="primary"
                                    onClick={() => setOpen(true)}> Bo&apos;lim
                        qo&apos;shish</Button>}
                />
                <Stack justifyContent="space-between" alignItems="center" sx={{minHeight: "650px"}}>
                    <Box sx={{
                        width: "100%",
                        marginBottom: "20px"
                    }}>
                        {loading ? Array(5).fill(",").map((_, index) => (
                            <TopicSectionsCardLoading key={index}/>
                        )) : data?.sectionList?.map(section => (
                            <TopicSectionsCard
                                key={section?._id}
                                section={section}
                                setOpen={setOpen}
                                setSectionId={setSectionId}
                                setSectionsData={setSectionsData}
                                setDeleteWarning={setDeleteWarning}
                            />
                        ))}

                    </Box>
                    <Pagination
                        count={data?.totalPages}
                        onChange={(_event, newPage) => setPage(newPage)}
                        color="primary"
                    />
                </Stack>
            </Container>
            <SectionAddEditForm
                open={open}
                topic_id={id}
                sectionsData={sectionsData}
                onClose={onClose}
            />

            <TopicSectionDeleteWarningModal
                open={deleteWarning}
                onClose={delOnClose}
                section_id={sectionId}
            />
        </>

    );
}
