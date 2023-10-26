import React from 'react';
import { Helmet } from 'react-helmet-async';

import OrderViewPage from 'src/sections/orders/view/order-view';

export default function OrdersPage() {
  return (
    <>
      <Helmet>
        <title>Buyurtmalar | Zilol Mebel</title>
      </Helmet>

      <OrderViewPage />
    </>
  );
}
