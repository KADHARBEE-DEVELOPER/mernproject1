import React, { useState } from 'react';
import axios from 'axios';

function LoginPage({ setUserName }) {
  const [userName, setUserNameInput] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!userName || !password) {
      alert('Please fill in both fields!');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/login', {
        f_userName: userName,
        f_Pwd: password
      });
      if (response.data.success) {
        setUserName(userName);
        alert('Login successful!');
      } else {
        alert('Invalid credentials!');
      }
    } catch (error) {
      console.error(error);
      alert('Error logging in!');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <input
        type="text"
        className="form-control"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserNameInput(e.target.value)}
      />
      <input
        type="password"
        className="form-control mt-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary mt-3" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;


