import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <SignedOut>
          <div>
            <h1>Please Sign In</h1>
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
            <UserButton />
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </SignedIn>
        <ToastContainer 
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Container>
    </Router>
  );
};

export default App;
