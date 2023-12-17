import React, {useState} from 'react';
import {useParams} from "react-router-dom";

import {Box, Stack, Button, Container, Pagination} from "@mui/material";

import {TopicSectionsCard} from "../topic-sections-card";
import {SectionAddEditForm} from "../section-add-edit-form";
import {TEACHING_CENTER_DASHBOARD_PATH} from "../../../../routes/path";
import {TopicSectionsCardLoading} from "../topic-sections-card.loading";
import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";
import {useGetSectionsListByTopicIdQuery} from "../../../../api/topic-api-req";

export function TopicSectionsView() {
    const {id, isLoading, isFetching} = useParams()

    const [page, setPage] = useState(1)

    const [open, setOpen] = useState(false)

    const {data} = useGetSectionsListByTopicIdQuery({
        id,
        page,
    })

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
                        {loading && Array(5).fill(",").map((_, index) => (
                            <TopicSectionsCardLoading key={index}/>
                        ))}
                        {data?.sectionList?.map(section => (
                            <TopicSectionsCard
                                key={section?._id}
                                section={section}
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
                onClose={() => setOpen(false)}
            />`
        </>

    );
}
