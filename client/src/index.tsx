import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/store/index";
import {UserProvider} from "./components/Context/UserContext"

ReactDOM.render(
  <Provider store = {store}>
    
    <BrowserRouter>
    <UserProvider>
      <App />
      </UserProvider> 
    </BrowserRouter>
    
  </Provider>,
  document.getElementById('root')
);


