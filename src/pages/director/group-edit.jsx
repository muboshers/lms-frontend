import React from 'react';
import { Helmet } from 'react-helmet-async';

import GroupEditView from 'src/sections/director/group-edit/view/group-edit-page';

export default function GroupEditPage() {
  return (
    <>
      <Helmet>
        <title>Guruh q&apos;shish | EduHub uz</title>
      </Helmet>

      <GroupEditView />
    </>
  );
}
