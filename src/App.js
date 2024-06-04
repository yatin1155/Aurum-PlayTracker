import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Journey from './components/Journey';
import Header from './components/Header';

function App() {
  const [sessionData, setSessionData] = useState({
    jiraTicket: '',
    desktopURL: '',
    mobileURL: '',
  });

  const [timers, setTimers] = useState({
    portrait: 0,
    landscape: 0,
    desktop: 0,
  });

  return (
    <>
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/" element={<Home setSessionData={setSessionData} />} />
          <Route path="/journey" element={<Journey sessionData={sessionData} timers={timers} setTimers={setTimers} />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
