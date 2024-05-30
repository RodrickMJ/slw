import React, { useEffect, useState } from 'react';
import './classList.css'

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      console.log(JSON.parse(storedUser))
      if (!storedUser) {
        throw new Error('No user found in localStorage');
      }

      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (!parsedUser.classes) {
        throw new Error('No classes found for the user');
      }

      setClasses(parsedUser.classes);
    } catch (error) {
      setError(error.message);
      console.error('Error al obtener los datos:', error);
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
   <>
     <div className='contList'>
      <h2>Lista de Clases</h2>
      {classes.length === 0 ? (
        <p>No hay clases disponibles</p>
      ) : (
        <ul>
          {classes.map((classItem) => (
            <li key={classItem._id}>{classItem.class_name}</li>
          ))}
        </ul>
      )}
    </div>
   </>
  );
};

export default ClassList;
