import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { LandingPage } from './LandingPage';
import HomePage from './components/homepage';

Amplify.configure(awsExports);

function App() {
  return (
    <div className="App">
      <Authenticator>
        {({ signOut }) => (
          <Router>
          <header className='App-header'>
            <button
              onClick={signOut}
              style={{
                fontSize: '0.8rem',
                padding: '5px 10px',
                marginLeft: 'auto',
              }}
            >
              Sign Out
            </button>
          </header>
          <main>
          <Routes>
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} /> */}
            <Route path="/landingPage" element={<LandingPage />} />
            <Route path="/" element={<HomePage />} exact /> {/* Only matches exactly '/' */}
          </Routes>
          </main>
        </Router>
        )}
      </Authenticator>
    </div>
  );
}

export default withAuthenticator(App);


