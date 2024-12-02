import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import PasscodeForm from './PasscodeForm';
import AdventCalendar from './AdventCalendar';
import { LanguageProvider } from './context/LanguageContext';
import LanguageToggle from './components/LanguageToggle';
import Day1 from './days/Day1';
import Day2 from './days/Day2';

const Header = () => {
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
          <div className="w-20 flex justify-end">
              <LanguageToggle />
          </div>
      </header>
  );
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // todo: change to false for production
    const correctPasscode = '1225'; 

    const handlePasscodeSubmit = (passcode) => {
        if (passcode === correctPasscode) {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect passcode');
        }
    };

      return (
        <LanguageProvider>
          <Router>
            <div className="min-h-screen h-full flex flex-col justify-between bg-[#6d1c22]">
              <Header />
              <main className="flex-grow flex justify-center items-center p-2 sm:p-4">
                {isAuthenticated ? (
                  <Routes>
                    <Route exact path="/" element={<AdventCalendar />} />
                    <Route path="/day1" element={<Day1 />} />
                    <Route path="/day2" element={<Day2 />} />
                  </Routes>
                ) : (
                  <PasscodeForm onPasscodeSubmit={handlePasscodeSubmit} />
                )}
              </main>
              <footer className="p-2 sm:p-4 bg-[#f3eedb] text-[#6d1c22] text-center text-sm sm:text-base">
                <a href="https://www.instagram.com/012kes" target="_blank" rel="noopener noreferrer">@eunseoya</a>
              </footer>
            </div>
          </Router>
        </LanguageProvider>
      );
};


export default App;