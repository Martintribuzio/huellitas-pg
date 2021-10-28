import { Route } from 'react-router-dom';
import Navbar from './components/navBar/NavBar';
import Title from './components/Title/Title';
import { ThemeProvider } from '@mui/material/styles';
import theme from './themeConfig';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Route path='/'>
          <Navbar />
          <Title />
        </Route>
      </div>
    </ThemeProvider>
  );
}

export default App;
