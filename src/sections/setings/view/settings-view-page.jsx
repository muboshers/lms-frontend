import React, { useState } from 'react';

import { Container } from '@mui/material';

import { SETTINGS_TABS } from 'src/contants';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';

import SettingsTab from '../settings-tabs';
import SettingsUpdateForm from '../settings-update-form';
import SettingsTelegramForm from '../settings-telegram-form';

export function SettingsViewPage() {
  const [activeTab, setActiveTab] = useState(SETTINGS_TABS.GENERAL);

  return (
    <Container>
      <CustomBreadcrumbs
        heading="Malumotlarni o'zgartirish"
        links={[{ name: "O'quv markaz ma'lumotlari" }]}
      />

      <SettingsTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === SETTINGS_TABS.GENERAL ? <SettingsUpdateForm /> : <SettingsTelegramForm />}
    </Container>
  );
}
