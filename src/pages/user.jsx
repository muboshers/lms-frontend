import { Helmet } from 'react-helmet-async';

import ClientViewPage from 'src/sections/client/view/client-view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Mijozlar ro&apos;yhait | Zilol Mebellar </title>
      </Helmet>

      <ClientViewPage />
    </>
  );
}
