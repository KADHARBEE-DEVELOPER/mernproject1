import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';  // Use NavLink
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/LoginPage';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';

function App() {
  const [userName, setUserName] = useState("");
  const [employeeData, setEmployeeData] = useState(null); // For editing an employee
  const [showLoginForm, setShowLoginForm] = useState(true); // To toggle login state

  const handleLogin = (user) => {
    setUserName(user);
    setShowLoginForm(false); // Hide login form upon successful login
  };

  const handleLogout = () => {
    setUserName("");
    setShowLoginForm(true); // Show login form upon logout
  };
  

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">Employee App</NavLink>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              {userName && (
                <>
                  <li className="nav-item">
                    <NavLink 
                      className="nav-link" 
                      to="/employees" 
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? 'yellow' : '',
                      })}
                    >
                      Employee List
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink 
                      className="nav-link" 
                      to="/create" 
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? 'yellow' : '',
                      })}
                    >
                      Create Employee
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            {userName && (
              <span className="navbar-text">
                Welcome, {userName} <button onClick={handleLogout} className="btn btn-link">Logout</button>
              </span>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        {/* Render LoginPage only if not authenticated */}
        <Route path="/" element={
          showLoginForm ? (
            <LoginPage setUserName={handleLogin} />
          ) : (
            <div className="container mt-5">
              <h2>Welcome to the Admin Panel, {userName}!</h2>
              <p>Select an option from the navigation menu.</p>
            </div>
          )
        } />
        
        {/* Conditional route rendering based on authentication */}
        {userName && (
          <>
            <Route path="/employees" element={<EmployeeList setEmployeeData={setEmployeeData} />} />
            <Route path="/create" element={<CreateEmployee employeeData={employeeData} setEmployeeData={setEmployeeData} />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
