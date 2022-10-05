import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

// Pages
import LoginPage from './pages/auth/LoginPage';
import NotesPage from './pages/notes/NotesPage';
import NotFoundPage from './pages/404/NotFoundPage';

function App() {

  // TODO: Chande to value from sessionStorage (or something dinamic)
  let loggedIn = true
  
  function Redirect({ to }) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    });
  }

  return (
    <div className="App">
      <Router>
        {/* Route Switch */}
        <Routes>
          {/* Redirections to protect our routes */}
          <Route
            exact
            path='/'
            element={ 
              loggedIn ?
                <Redirect to='/dashboard' /> :
                <Redirect to='/login' /> 
            }
          />
          {/* Login Route */}
          <Route exact path='/login' element={<LoginPage />} />
          {/* Notes Route */}
          <Route
            exact
            path='/dashboard'
            element={ 
              loggedIn ?
                <NotesPage /> :
                <Redirect to='/login' /> 
            }
          />
          {/* 404 - Page Not Found */}
          <Route path='*' element={ <NotFoundPage /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
