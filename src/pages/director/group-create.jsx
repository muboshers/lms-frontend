import React from "react";
import {Helmet} from "react-helmet-async";

import NewGroupPage from "src/sections/director/group-create/view";

export default function GroupCreate() {
    return (
        <>
            <Helmet>
                <title>Guruh q&apos;shish | EduHub uz</title>
            </Helmet>

            <NewGroupPage/>
        </>
    );
}
