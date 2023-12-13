import React from 'react';

import {Container} from "@mui/material";

import {PupilsView} from "../pupils-view/view";
import {TEACHING_CENTER_DASHBOARD_PATH} from "../../../routes/path";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";

export default function TopicViewSection() {
    return (
        <Container>
            <CustomBreadcrumbs
                heading="Topik"
                links={[
                    {name: 'Guruhlar', href: TEACHING_CENTER_DASHBOARD_PATH.GROUPS},
                    {name: "Topiklar ro'yhati"},
                ]}
            />

            <PupilsView/>
        </Container>
    );
}
