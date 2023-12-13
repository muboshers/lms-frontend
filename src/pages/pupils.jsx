import React from 'react';
import {Helmet} from "react-helmet-async";

import {PupilsListView} from "../sections/pupils/view";

export default function PupilsPage() {
    return (
        <>
            <Helmet>
                <title>O&apos;quvchilar | Eduhub uz </title>
            </Helmet>


            <PupilsListView/>
        </>
    );
}
