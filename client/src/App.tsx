import { Route } from 'react-router-dom';
import Navbar from './components/navBar/NavBar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './themeConfig';
import PostAPet from './components/PostAPet';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer/Footer';
import Login from './components/Login';
import PostDetail from './components/PostDetail/PostDetail';
import Publicaciones from './components/Home.jsx';
import { Home } from './pages/Home';
import { Redirect } from 'react-router';
import { Messenger } from './components/Messages/Message';
import About from './components/About/about';
import HomeShelter from './components/home_shelter';
import MercadoPago from './components/mercadoPago/mercadoPago.jsx';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Route path='/home'>
          <Navbar />
        </Route>

        <Route exact path='/login'>
          <Login />
        </Route>

        <Route exact path='/home'>
          <Home />
        </Route>

        <Route exact path='/home/detail/:id'>
          <PostDetail />
        </Route>

        <Route path='/home/createPost'>
          <PostAPet />
        </Route>

        <Route path='/home/profile'>
          <Profile />
        </Route>
        <Route path='/home/about'>
          <About />
        </Route>
        <Route path='/home/feed'>
          <Publicaciones />
        </Route>

        <Route path='/alldogs'>{/* <Alldogs /> */}</Route>
        <Route path='/home/shelters'>
          <HomeShelter />
        </Route>

        <Route path='/home/messenger/:ConversId' component={Messenger} />
        {/* <Message />
        </Route> */}

        <Route exact path='/home/messenger'>
          <Messenger />
        </Route>

        <Route exact path='/notification'>
          {/* <Notification /> */}
        </Route>

        {/* <Route path='/register'>
          <Register />
        </Route> */}

        <Route path='/found'>{/* <Found/> */}</Route>

        <Route path='/lost'>{/* <Lost/> */}</Route>

        <Route path='/adoption'>{/* <Adoption /> */}</Route>

        <Route path='/home' component={Footer} />

        <Route path='/home/donate' component={MercadoPago} />

        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
      </div>
    </ThemeProvider>
  );
}

export default App;
