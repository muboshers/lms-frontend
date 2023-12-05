import React from 'react';
import { Helmet } from 'react-helmet-async';

import { SettingsViewPage } from 'src/sections/setings/view';

export default function SettingsPage() {
  return (
    <>
      <Helmet>
        <title>Sozlamalar | Eduhub uz</title>
      </Helmet>

      <SettingsViewPage />
    </>
  );
}
