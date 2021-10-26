import {Route} from 'react-router-dom'
import Navbar from './components/navBar/NavBar'
import Title from './components/Title/Title'
function App() {
  return (
    <div className='App'>
      <Route path='/'>
        <Navbar />
        <Title />
        </Route>
    </div>
  )
}

export default App
