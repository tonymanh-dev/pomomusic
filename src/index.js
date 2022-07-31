import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './Context/AppContext';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </AppProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
