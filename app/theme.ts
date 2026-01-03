import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#111827'
    },
    secondary: {
      main: '#2563eb'
    },
    background: {
      default: '#fafafa'
    }
  },
  shape: {
    borderRadius: 12
  }
});

export default theme;
