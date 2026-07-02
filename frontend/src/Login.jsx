import { useState } from 'react';
import api from './api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // stops the page from refreshing on submit

    try {
      const formData = new URLSearchParams();
      formData.append('username', email); // FastAPI's OAuth2 login expects "username"
      formData.append('password', password);

      const response = await api.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      console.log('Token:', response.data.access_token);
      localStorage.setItem('token', response.data.access_token);
      setMessage('Login successful!');
    } catch (error) {
      console.error(error);
      setMessage('Login failed. Check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log In</button>
      <p>{message}</p>
    </form>
  );
}

export default Login;