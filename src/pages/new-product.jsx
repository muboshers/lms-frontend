import { Helmet } from 'react-helmet-async';

import NewProductForm from 'src/sections/new-product/new-product-form';

// ----------------------------------------------------------------------

export default function NewProductPage() {
  return (
    <>
      <Helmet>
        <title> Yangi Mahsulot Qo&apos;shish | Zilol Mebel </title>
      </Helmet>
      <NewProductForm />
    </>
  );
}
