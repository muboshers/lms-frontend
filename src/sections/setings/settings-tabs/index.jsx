import React from 'react';
import PropTypes from 'prop-types';

import { Card, Stack, MenuItem } from '@mui/material';

import { SETTINGS_TABS } from 'src/contants';

SettingsTab.propTypes = {
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
};

export default function SettingsTab({ activeTab, setActiveTab }) {
  const tabs = [SETTINGS_TABS.GENERAL, SETTINGS_TABS.TG_BOT];

  return (
    <Card
      sx={{
        marginBottom: 2,
      }}
    >
      <Stack flexDirection="row" alignItems="center">
        {tabs.map((tab) => (
          <MenuItem
            key={tab}
            sx={{
              padding: '10px 20px',
            }}
            selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </MenuItem>
        ))}
      </Stack>
    </Card>
  );
}
