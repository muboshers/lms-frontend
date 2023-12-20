import { Divider, Container, Typography } from '@mui/material';

export default function Navigation() {
  return (
    <div>
      <Container sx={{ height: 70, width: '100%', paddingTop: 2 }}>
        <Typography variant="h4" align="left">
          Omina Podinova
        </Typography>
      </Container>
      <Divider flexItem variant="fullWidth" />
    </div>
  );
}
