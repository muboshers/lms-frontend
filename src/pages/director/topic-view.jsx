import React from 'react';
import {Helmet} from "react-helmet-async";

import {TopicViewSection} from "../../sections/director/topic-view/view";


export default function TopicView() {
    return (
        <>
            <Helmet>
                <title> Topiklar | Edu hub uz </title>
            </Helmet>


            <TopicViewSection/>
        </>
    );
}
