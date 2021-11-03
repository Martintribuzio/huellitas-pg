import { createTheme } from '@mui/material/styles';
import { yellow } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: "#73A7CB",
      contrastText: "#fff"
    },
    secondary: {
      main: yellow[800],
    },
  },
  typography: {
    fontFamily: "poppins",
    
  }
});
export default theme;
