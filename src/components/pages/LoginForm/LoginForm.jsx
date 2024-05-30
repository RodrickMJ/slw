import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './formLogin.css';

export const LoginForm = () => {
  const [form, setForm] = useState({
    name: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/users?name=${form.name}`);
      const data = await response.json();

      if (response.ok && data.length > 0 && data[0].password === form.password) {
        localStorage.setItem('user', JSON.stringify(data[0]));
        navigate('/inicio');
      } else {
        alert('Nombre de usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="loginForm">
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className='optionsd'>
      <button type="submit">Iniciar Sesión</button>

      <p>¿No tienes una cuenta? <a href="/registro"> Create una</a></p>
      </div>
    </form>
   </> 
  );
};
