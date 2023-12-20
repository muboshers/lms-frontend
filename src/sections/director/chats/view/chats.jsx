import React from 'react';

import { Card, Container } from '@mui/material';

import Body from '../body';
import Aside from '../aside';

export default function Chats() {
  return (
    <Container>
      <Card
        sx={{
          height: '450px',
          width: '100%',
        }}
      >
        <aside
          style={{
            width: '240px',
            height: 450,
            float: 'left',
            borderRight: '2px solid #f9fafb',
          }}
        >
          <Aside />
        </aside>
        <Container
          style={{
            float: 'right',
            width: 'calc(100% - 240px)',
            height: 450,
            background: '#f4f6f8',
          }}
        >
          <Body />
        </Container>
      </Card>
    </Container>
  );
}
