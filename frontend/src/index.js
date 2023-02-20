import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PostContext } from './context/PostContext';
const mode = localStorage.getItem("mode");



ReactDOM.render(
  <div style={{minHeight : "100vh"}} className={mode === "d" ? "night-mode" : ""}>
  <PostContext.Provider >
  <App  />
  </PostContext.Provider>
  </div>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorkerRegistration.register();

