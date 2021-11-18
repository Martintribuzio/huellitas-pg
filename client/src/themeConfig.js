import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#73A7CB",
      contrastText: "#fff"
    },
    secondary: {
      main: "#E9E9E9",
    },
    error:{
      main: "#FF0000",
    }
  },
  typography: {
    fontFamily: "poppins",
    
  }
});
export default theme;
