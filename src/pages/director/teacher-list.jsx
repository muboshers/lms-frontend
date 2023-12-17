import React from 'react';
import {Helmet} from 'react-helmet-async';

import {TeacherListView} from 'src/sections/director/teacher-list/view';

export default function TeachersListPage() {
    return (
        <>
            <Helmet>
                <title>O&apos;qituvchilar | Eduhub uz </title>
            </Helmet>

            <TeacherListView/>
        </>
    );
}
