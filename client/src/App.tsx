import PostAPet from "./components/PostAPet"
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Route
          exact path='/'
          render={() => <LandingPage/>}
        />
      <Route
          exact path = '/home'
          render={() => <Home/> }
        />
      <Route
          exact path = '/home/createPost'
          render={() => <PostAPet/> }
        />
    </div>
  )
}

export default App
