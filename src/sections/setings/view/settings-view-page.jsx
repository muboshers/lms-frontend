import React from 'react';

import { Container } from '@mui/material';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';

import SettingsUpdateForm from '../settings-update-form';

export function SettingsViewPage() {
  return (
    <Container>
      <CustomBreadcrumbs
        heading="Malumotlarni o'zgartirish"
        links={[{ name: "O'quv markaz ma'lumotlari" }]}
      />

      <SettingsUpdateForm />
    </Container>
  );
}
