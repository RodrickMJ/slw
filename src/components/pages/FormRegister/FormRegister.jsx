import React, { useState } from 'react';
import './formRegister.css';

export const FormRegister = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    roll: 'Docente', // Establecemos 'Docente' como valor por defecto
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      console.log('Datos del formulario:', data);

      // Manejo de éxito
      setSuccess('Usuario registrado con éxito.');
      setError(null);
      setTimeout(() => {
        window.location.href = '/login';
    }, 2500);
    } catch (error) {
      // Manejo de error
      setError('Error al registrar el usuario.');
      setSuccess(null);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='xd'>
        <div className='contForm'>
          <div className='dateForm'>
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
          <div className='dateForm'>
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='dateForm'>
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
          <div className='dateFormRol'>
            <label htmlFor="roll">Rol:</label>
            <select
              id="roll"
              name="roll"
              value={form.roll}
              onChange={handleChange}
              required
            >
              <option value="Docente">Docente</option>
              <option value="Estudiante">Estudiante</option>
            </select>
          </div>
          <br />
          <button type="submit">Registrar</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <p>Ya cuentas con una cuenta! <a href="/login">Inicia sesion aqui</a></p>
        </div>
      </form>
    </>
  );
};
