import React from 'react';

import { Box, Card, Container } from '@mui/material';

import Body from '../body';
import Aside from '../aside';

export default function Chats() {
  return (
    <Container>
      <Card
        sx={{
          height: '750px',
          width: '100%',
          display: 'flex',
        }}
      >
        <aside
          style={{
            width: '320px',
            height: 750,
            float: 'left',
            borderRight: '2px solid #f9fafb',
          }}
        >
          <Aside />
        </aside>
        <Box
          style={{
            flex: 1,
            float: 'right',
            height: 750,
            background: '#f4f6f8',
          }}
        >
          <Body />
        </Box>
      </Card>
    </Container>
  );
}
