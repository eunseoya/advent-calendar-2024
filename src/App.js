import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import PasscodeForm from './PasscodeForm';
import AdventCalendar from './AdventCalendar';
import { LanguageProvider } from './context/LanguageContext';
import LanguageToggle from './components/LanguageToggle';
import Profile from './components/Profile';
import Login from './components/Login';
import { FaUser } from 'react-icons/fa';
import SubscriptionForm from './components/SubscriptionForm';

// import { AuthProvider } from './context/AuthContext';

const requireDays = require.context('./days', false, /Day[0-9]+\.js$/);
const dayComponents = requireDays.keys()
  .sort((a, b) => {
    const dayA = parseInt(a.match(/Day(\d+)\.js$/)[1], 10);
    const dayB = parseInt(b.match(/Day(\d+)\.js$/)[1], 10);
    return dayA - dayB;
  })
  .map(path => requireDays(path).default);

  const Header = ({ isPasscodeAuthenticated }) => {
    const location = useLocation();
    const isDayPage = location.pathname.startsWith('/day');
  
    return (
      <header className="p-4 bg-[#f3eedb] text-[#6d1c22] flex justify-between items-center">
        <div className="w-20">
          {isDayPage && (
            <Link to="/" className="text-[#6d1c22]">
              Back
            </Link>
          )}
        </div>
        <h1 className="text-xl sm:text-2xl">Advent Calendar</h1>
        <div className="w-20 flex justify-end items-center space-x-2">
          <LanguageToggle />
          {/* {isPasscodeAuthenticated && (
            <Link to="/profile">
              <FaUser className="w-6 h-6" />
            </Link>
          )} */}
        </div>
      </header>
    );
  };

const App = () => {
  const [isPasscodeAuthenticated, setIsPasscodeAuthenticated] = useState(false); // Initial passcode auth
  const correctPasscode = '1225';

  return (
    // <AuthProvider>
      <LanguageProvider>
        <Router basename="/advent-calendar-2024">
          <AppContent 
            isPasscodeAuthenticated={isPasscodeAuthenticated} 
            setIsPasscodeAuthenticated={setIsPasscodeAuthenticated} 
            correctPasscode={correctPasscode} 
          />
        </Router>
      </LanguageProvider>
    // </AuthProvider>
  );
};

const AppContent = ({ isPasscodeAuthenticated, setIsPasscodeAuthenticated, correctPasscode }) => {
  const navigate = useNavigate();

  const handlePasscodeSubmit = (passcode) => {
    if (passcode === correctPasscode) {
      setIsPasscodeAuthenticated(true);
      navigate('/');
    } else {
      alert('Incorrect passcode');
    }
  };

  return (
    <div className="min-h-screen h-full flex flex-col justify-between bg-[#6d1c22]">
      <Header isPasscodeAuthenticated={isPasscodeAuthenticated} />
      <main className="flex-grow flex justify-center items-center p-2 sm:p-4">
        {isPasscodeAuthenticated ? (
          <Routes>
            <Route exact path="/" element={<AdventCalendar />} />
            <Route path="/subscribe" element={<SubscriptionForm />} />
            {/* <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} /> */}
            {Array.from({ length: 25 }, (_, i) => (
              <Route
                key={`day${i + 1}`}
                path={`/day${i + 1}`}
                element={React.createElement(dayComponents[i])}
              />
            ))}
          </Routes>
        ) : (
          <PasscodeForm onPasscodeSubmit={handlePasscodeSubmit} />
        )}
      </main>
      <footer className="p-2 sm:p-4 bg-[#f3eedb] text-[#6d1c22] text-center text-sm sm:text-base">
        <a href="https://www.instagram.com/012kes" target="_blank" rel="noopener noreferrer">@eunseoya</a>
      </footer>
    </div>
  );
};

export default App;