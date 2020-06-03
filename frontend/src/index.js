import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CheckboxesTags from './search';
import ParticlesBg from "particles-bg";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // | "color"
  // | "ball"
  // | "lines"
  // | "thick"
  // | "circle"
  // | "cobweb"
  // | "polygon"
  // | "square"
  // | "tadpole"
  // | "fountain"
  // | "random"
  // | "list"
  // | "custom";
  <React.StrictMode>
    <ParticlesBg type="square" bg={true} color = ""/>
    <CheckboxesTags/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
