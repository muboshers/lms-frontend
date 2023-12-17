import React, {useState} from 'react';
import {useParams} from "react-router-dom";

import {Container} from "@mui/material";

import {PupilsView} from "../pupils-view/view";
import {TEACHING_CENTER_DASHBOARD_PATH} from "../../../../routes/path";
import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";
import {useGetPupilsListByTopicIdQuery} from "../../../../api/topic-api-req";

export default function TopicViewSection() {

    const {id} = useParams()
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState("")
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const {data, isLoading, isFetching} = useGetPupilsListByTopicIdQuery({
        id,
        page,
        search,
        limit: rowsPerPage,
    })
    return (
        <Container>
            <CustomBreadcrumbs
                heading={`${data?.topic?.teacher_id?.name} o'quvchilari`}
                links={[
                    {name: 'Guruhlar', href: TEACHING_CENTER_DASHBOARD_PATH.GROUPS},
                    {name: "Bo'limlar ro'yhati", href: `${TEACHING_CENTER_DASHBOARD_PATH.TOPIC_SECTION_VIEW}/${id}`},
                ]}
            />
            <PupilsView
                data={data}
                page={page}
                setPage={setPage}
                setSearch={setSearch}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                loading={isLoading || isFetching}
            />
        </Container>
    );
}
