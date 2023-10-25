/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable import/no-extraneous-dependencies */
import Pusher from 'pusher-js';
import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { useGetNotificationListQuery } from 'src/api/notificaiton-api-req';

import Nav from './nav';
import Main from './main';
import Header from './header';
import NotificationSound from '../../assets/notification-sound.mp3';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const audioRef = useRef();

  const [openNav, setOpenNav] = useState(false);

  const { data: notificationData } = useGetNotificationListQuery();

  const [clonedNotificationData, setClonedNotificationData] = useState([]);

  useEffect(() => {
    const pusher = new Pusher('0edb74eed3e3ebdabbf4', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('my-channel');

    channel.bind('order', (data) => {
      audioRef.current?.play();
      console.log(data);
    });

    return () => {
      pusher.unsubscribe();
    };
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

      <audio
        style={{
          display: 'none',
        }}
        controls
        src={NotificationSound}
        ref={audioRef}
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
