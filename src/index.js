import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/App.css'
import App from './components/App';
// import Artists from './components/Artists'

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <Router>
      <Routes>
        <Route path='/search' element={<Artists />} />
        <Route exact path='/' element={<App />} />
      </Routes>
    </Router> */}
  </React.StrictMode>,
  document.getElementById('root')
);
