import styled from '@emotion/styled';

import {
  Card,
  List,
  Paper,
  Button,
  ListItem,
  Container,
  InputBase,
  Typography,
} from '@mui/material';

import SvgColor from 'src/components/svg-color';
import Scrollbar from 'src/components/scrollbar';

import Navigation from './navigation';

const CustomCardRight = styled(Card)`
  padding: 10px;
  border-top-right-radius: 0;
`;

const CustomCardLeft = styled(Card)`
  padding: 10px;
  border-top-left-radius: 0;
`;
export default function Body() {
  return (
    <div>
      <Navigation />
      <Container sx={{ width: '100%', height: '380px', position: 'relative' }} disableGutters>
        <Scrollbar>
          <List>
            {arrayMessage.map((text, index) =>
              text.left ? (
                <ListItem key={index} sx={{ justifyContent: 'flex-end' }}>
                  <CustomCardRight>
                    <Typography variant="body2">{text.text}</Typography>
                  </CustomCardRight>
                </ListItem>
              ) : (
                <ListItem key={index} sx={{ justifyContent: 'flex-start' }}>
                  <CustomCardLeft>
                    <Typography variant="body2">{text.text}</Typography>
                  </CustomCardLeft>
                </ListItem>
              )
            )}
          </List>
        </Scrollbar>
        <Paper
          component="form"
          sx={{
            position: 'absolute',
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: 'max-content',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            zIndex: 5,
          }}
        >
          <InputBase
            type="text"
            sx={{ ml: 1, flex: 1 }}
            placeholder="Write a message..."
            multiline
          />
          <Button type="button">
            <SvgColor src="/assets/icons/chat/ic_send.svg" sx={{ width: 35, height: 35 }} />
          </Button>
        </Paper>
      </Container>
    </div>
  );
}

const arrayMessage = [
  {
    left: true,
    text: 'Salom',
  },
  {
    left: false,
    text: 'Salom',
  },
  {
    left: true,
    text: 'yana salom',
  },
  {
    left: false,
    text: 'yana yana salom',
  },
  {
    left: true,
    text: 'yana yana yana salom',
  },
  {
    left: false,
    text: 'yana yana yana yana salom',
  },
  {
    left: true,
    text: 'yana yana yana yana yana salom',
  },
  {
    left: false,
    text: 'yana yana yana yana yana yana salom',
  },
  {
    left: true,
    text: 'yana yana yana yana yana yana yana salom',
  },
  {
    left: false,
    text: 'yana yana yana yana yana yana yana yana salom',
  },
  {
    left: true,
    text: 'Ommo izvording salom beraverip nima kerak',
  },
  {
    left: false,
    text: 'Prosta savol bergim keldida',
  },
];
