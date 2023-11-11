import React from "react";
import { Helmet } from "react-helmet-async";

import GroupPageViewSection from "src/sections/group-view/view";

export default function GroupView() {
  return (
    <>
      <Helmet>
        <title>Guruh haqida ma&apos;lumot | EduHub uz</title>
      </Helmet>

      <GroupPageViewSection />
    </>
  );
}
