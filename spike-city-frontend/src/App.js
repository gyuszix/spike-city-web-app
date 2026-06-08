// frontend/src/App.js
import './App.css';
import './styles/fonts.css';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Login from './components/Login/Login.js';
import Logout from './components/Logout/Logout.js';
import ViewAdmin from './components/ViewAdmin/ViewAdmin.js';
import EventsList from './components/EventsList/EventsList.js';
import ViewHome from './components/ViewHome/ViewHome.js';
import EventsDataService from './services/events';
import EventsDetails from './components/EventDetails/EventDetails.js';
import NotificationSystem from './components/NotificationSystem/NotificationSystem.js';
import AdminRoutes from './components/AdminRoutes/AdminRoutes.js';
import { ADMINS } from './config/admins'; 

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  // login
  useEffect(() => {
    try {
      const loginData = JSON.parse(localStorage.getItem('login'));
      if (loginData) {
        const now = Date.now() / 1000;
        if (now < loginData.exp) {
          setUser(loginData);
        } else {
          localStorage.removeItem('login');
        }
      }
    } catch (e) {
      console.error('Failed to parse login data:', e);
      localStorage.removeItem('login');
    } finally {
      setUserLoaded(true);
    }
  }, []);

  // load events on login
  useEffect(() => {
    if (user && user.sub) {
      EventsDataService.getEvents(user.sub)
        .then((res) => {
          //console.log('Events loaded:', res.data);
        })
        .catch((err) => {
          console.error('Failed to load events:', err);
        });
    }
  }, [user]);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <Navbar className="custom-navbar" expand="lg" sticky="top">
          <Container className="container-fluid">
            <Navbar.Brand href="/" className="font-pricedown">
              <img
                src="/images/spikecity.png"
                alt="volleyball logo"
                className="volleybunchLogo"
              />
              A Volleyball App
            </Navbar.Brand>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {/* Apply font to all nav links */}
              <Nav className="ml-auto font-pricedown">
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                {user && <Nav.Link as={Link} to={`/events/${user.sub}`}>Events</Nav.Link>}
                {user && ADMINS.includes(user.sub) && (
                  <Nav.Link as={Link} to={`/admin/${user.sub}`}>Admin</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>

            {/* Bell + Banner */}
            <NotificationSystem user={user} />

            {user ? (
              <Logout setUser={setUser} clientID={clientId} />
            ) : (
              <Login setUser={setUser} />
            )}
          </Container>
        </Navbar>

        <Routes>
          <Route exact path="/" element={<ViewHome user={user} />} />
          <Route path="/home/" element={<ViewHome user={user} />} />
          <Route path="/events/:id" element={<EventsList user={user} />} />
          <Route path="/events/eventDetails/:eventNum" element={<EventsDetails />} />
          
          <Route element={<AdminRoutes user={user} />}>
            <Route path="/admin/:id" element={<ViewAdmin user={user} />} />
          </Route>
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;