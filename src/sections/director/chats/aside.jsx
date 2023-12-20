import * as React from 'react';

import { List, Avatar, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';

import Scrollbar from 'src/components/scrollbar';

export default function Aside() {
  return (
    <List sx={{ height: '100%' }}>
      <Scrollbar>
        {dummyArray.map((text) => {
          const words = text.split(' ');
          const initials = words.map((word) => word[0]).join('');
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar>{initials}</Avatar>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </Scrollbar>
    </List>
  );
}

const dummyArray = [
  'Ozodbek Poydedayev',
  'Ozoda Piyozova',
  'Oybek Poybekov',
  'Omina Podinova',
  'Sherzod Ozodbekov',
  'Ozodbek Poydedayev',
  'Ozoda Piyozova',
  'Oybek Poybekov',
  'Omina Podinova',
  'Sherzod Ozodbekov',
  'Ozodbek Poydedayev',
  'Ozoda Piyozova',
  'Oybek Poybekov',
  'Omina Podinova',
  'Sherzod Ozodbekov',
  'Ozodbek Poydedayev',
  'Ozoda Piyozova',
  'Oybek Poybekov',
  'Omina Podinova',
  'Sherzod Ozodbekov',
];
