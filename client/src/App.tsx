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
import { Messenger } from './components/Messenger/Messenger';
import About from './components/About/about';
import HomeShelter from './components/home_shelter';
import MercadoPago from './components/mercadoPago/mercadoPago';
import ShelterProfile from './components/shelterProfile/ShelterProfile';
import Success from './components/mercadoPago/Success';
import Fail from './components/mercadoPago/Fail';

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

        <Route exact path='/register'>
          <Login />
        </Route>

        <Route exact path='/home'>
          <Home />
        </Route>

        <Route exact path='/home/detail/:id'>
          <PostDetail />
        </Route>

        <Route exact path='/home/shelter/details/:id'>
          <ShelterProfile />
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

        <Route exact path='/home/shelters'>
          <HomeShelter />
        </Route>

        <Route path='/home/messenger/:ConversId' component={Messenger} />

        <Route exact path='/home/donate' >
          <MercadoPago />
          </Route>
          
        <Route path='/home/donate/success' >
          <div style={{display:'flex',justifyContent:'center'}}>
          <Success />
          </div>
        </Route>

        <Route path='/home/donate/Fail' >
          <div style={{display:'flex',justifyContent:'center'}}>
          <Fail />
          </div>
        </Route>


        <Route exact path='/home/messenger'>
          <Messenger />
        </Route>
        

        <Route path='/home' component={Footer} />


        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
      </div>
    </ThemeProvider>
  )
}

export default App
