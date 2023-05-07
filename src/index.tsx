import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./state/store";
import AppWithRedux from "./AppWithRedux";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// компонент Provider нужен для того что отправить редаксовский объект store в контекст нашего приложения
root.render(
  <Provider store={store}>
    <AppWithRedux/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

