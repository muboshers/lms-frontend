import Pusher from 'pusher-js';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { OrderNotification } from 'src/utils/notification';

import { useGetNotificationListQuery } from 'src/api/notificaiton-api-req';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  const { data: notificationData } = useGetNotificationListQuery();

  const user = useSelector((state) => state.user);

  const [clonedNotificationData, setClonedNotificationData] = useState([]);

  useEffect(() => {
    const pusher = new Pusher('0edb74eed3e3ebdabbf4', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('my-channel');

    if (user?.isAuthenticated) {
      channel.bind('my-event', (data) => {
        const client_name = data?.data?.orderId?.client_id?.name;
        const product_image = data?.data?.orderId?.product_id?.color[0].image;
        OrderNotification(client_name, product_image);
        setClonedNotificationData((prev) => [...prev, { ...data.data }]);
        setTimeout(() => {}, 1000);
      });
    }

    // return () => {
    //   pusher.unsubscribe();
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setClonedNotificationData(notificationData ?? []);
  }, [notificationData]);

  return (
    <>
      <Header
        data={clonedNotificationData}
        setClonedNotificationData={setClonedNotificationData}
        onOpenNav={() => setOpenNav(true)}
      />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}
DashboardLayout.propTypes = {
  children: PropTypes.node,
};
