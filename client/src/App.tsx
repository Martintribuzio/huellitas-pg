import { Route } from 'react-router-dom';
import Navbar from './components/navBar/NavBar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './themeConfig';
import PostAPet from './components/PostAPet';
import Profile from './components/Profile/Profile';
import Messenger from './components/Messenger/MessagesNoti';
import Footer from './components/Footer/Footer';
import Login from './components/Login';
import Register from './components/Register/Register';
import PostDetail from './components/PostDetail/PostDetail';
import Publicaciones from './components/Home';
import { Home } from './pages/Home';
import { Redirect } from 'react-router';

function App() {
  // const [result, user] = useUser();

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Route path='/home'>
          <Navbar />
        </Route>
        <Route
          exact
          path='/login'
          // render={() =>
          //   result === 'Success' ? <Redirect to='/home' /> : <LandingPage />
          // }
        >
          <Login />
        </Route>
        <Route exact path='/home'>
          <Home />
        </Route>
        <Route exact path='/home/detail/:id'>
          <PostDetail />
        </Route>
        <Route
          path='/home/createPost'
          // render={() =>
          //   result === 'Success' ? <PostAPet /> : <Redirect to='/' />
          // }
        >
          <PostAPet />
        </Route>
        <Route path='/home/profile'>
          <Profile />
        </Route>

        <Route path='/alldogs'>{/* <Alldogs /> */}</Route>
        <Route exact path='/home/menssage'>
          <Messenger />
        </Route>
        <Route exact path='/notification'>
          {/* <Notification /> */}
        </Route>

        <Route path='/register'>
          <Register />
        </Route>

        <Route path='/found'>{/* <Found/> */}</Route>
        <Route path='/lost'>{/* <Lost/> */}</Route>
        <Route path='/adoption'>{/* <Adoption /> */}</Route>

        <Route path='/home'>
          {' '}
          <Footer />
        </Route>
        <Route path='/'>
          <Redirect to='/home' />
        </Route>
      </div>
    </ThemeProvider>
  );
}

export default App;
