import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./redux/store/index";

ReactDOM.render(
<<<<<<< HEAD
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
=======
  <Provider store = {store}> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
>>>>>>> 94085b05c49e1f128b3e426d8ce991e4ff40c023
  document.getElementById('root')
);


