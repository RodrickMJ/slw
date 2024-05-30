import React, { useState, useEffect } from 'react';
import './createClassForm.css';

export const CreateClassForm = ({ onCancel }) => {
  const [className, setClassName] = useState('');
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      const newClass = { class_name: className, teacher: user.name, users: students.map(student => student._id) };
      console.log(newClass);

      const response = await fetch('http://localhost:3000/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClass),
      });

      if (!response.ok) {
        throw new Error('Error al crear la clase');
      }

      const createdClass = await response.json();
      await fetch(`http://localhost:3000/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user, classes: [...user.classes, createdClass._id] }),
      });

      for (const student of students) {
        await fetch(`http://localhost:3000/api/users/notification/${student._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: `Has sido agregado a la clase ${className}` }),
        });
      }

      onCancel();
    } catch (error) {
      console.error('Error al crear la clase:', error);
    }
  };

  const handleStudentSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users?name=${studentName}`);
      const data = await response.json();

      if (response.ok && data.length > 0) {
        setStudents([...students, data[0]]);
        setStudentName('');
      } else {
        alert('Alumno no encontrado');
      }
    } catch (error) {
      console.error('Error al buscar alumno:', error);
    }
  };

  return (
    <div className="createClassForm-container">
      <form onSubmit={handleSubmit} className="createClassForm">
        <div>
          <label htmlFor="className">Nombre de la Clase:</label>
          <input
            type="text"
            id="className"
            name="className"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="teacher">Profesor:</label>
          <input
            type="text"
            id="teacher"
            name="teacher"
            value={user?.name}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="studentName">Agregar Alumno:</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <button type="button" onClick={handleStudentSearch}>Buscar Alumno</button>
        </div>
        <ul>
          {students.map((student, index) => (
            <li key={index}>{student.name}</li>
          ))}
        </ul>
        <button type="submit">Crear Clase</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
};
