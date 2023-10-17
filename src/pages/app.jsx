import { Helmet } from 'react-helmet-async';

import { CategoryView } from 'src/sections/category/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Kategoriyalar | Furnitura Uz </title>
      </Helmet>

      <CategoryView />
    </>
  );
}
