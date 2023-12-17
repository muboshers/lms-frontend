import React from 'react';

import { Container } from '@mui/material';

import { TEACHING_CENTER_DASHBOARD_PATH } from 'src/routes/path';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import GroupEditForm from '../group-edit-form';

export default function GroupEditView() {
  
  return (
    <Container>
      <CustomBreadcrumbs
        heading="Guruh"
        links={[
          {
            name: "Guruhlar ro'yhati",
            href: TEACHING_CENTER_DASHBOARD_PATH.GROUPS,
          },
          {
            name: 'Guruhni yangilash',
          },
        ]}
      />

      <GroupEditForm />
    </Container>
  );
}
