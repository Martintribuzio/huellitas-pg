import { createTheme } from '@mui/material/styles';
import { yellow, lightBlue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[300],
      contrastText: "#fff"
    },
    secondary: {
      main: yellow[800],
    },
  },
});
export default theme;
