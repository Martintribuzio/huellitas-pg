import { Route } from 'react-router-dom';
import Navbar from './components/navBar/NavBar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './themeConfig';
import LandingPage from './components/LandingPage';
import Feed from './components/Feed';
import PostAPet from './components/PostAPet';
import Profile from './components/Profile/Profile';
import Messages from './components/Messages/Messages';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        
        <Route path='/home'>
          <Navbar />
        </Route>
        
        <Route  exact path='/'>
          <LandingPage/>
        </Route>
        
        <Route exact path='/home'>
          <Feed/>
        </Route>

        <Route path='/home/createPost'>
          <PostAPet/>
        </Route>

        <Route path='/home/profile'>
          <Profile/>
        </Route>
        
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/alldogs'>
          {/* <Alldogs /> */}
        </Route>
        <Route exact path='/home/menssage'>
          <Messages />
        </Route>
        <Route exact path='/notification'>
          {/* <Notification /> */}
        </Route>
        <Route path='/register'>
          <Register/>
        </Route>
        <Route path='/found'>
          {/* <Found/> */}
        </Route>
        <Route path='/lost'>
          {/* <Lost/> */}
        </Route>
        <Route path='/adoption'>
          {/* <Adoption /> */}
        </Route>
      </div>
    </ThemeProvider>
  );
}

export default App;
