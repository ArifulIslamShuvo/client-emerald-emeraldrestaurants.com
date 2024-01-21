import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import App from './Components/App';
import './index.css';
import { AppContextProvider } from './Context/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </Provider>
);

