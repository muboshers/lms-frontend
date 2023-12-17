import React from 'react';
import {Helmet} from "react-helmet-async";

import {TopicSectionsView} from "../../sections/director/topic-section-view/view";

export default function TopicSections() {
    return (
        <>
            <Helmet>
                <title> Sectionlar sahifasiz | Eduzen uz </title>
            </Helmet>

            <TopicSectionsView/>
        </>
    );
}
