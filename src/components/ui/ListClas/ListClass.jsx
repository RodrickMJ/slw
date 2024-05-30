import React, { useState, useEffect } from 'react';

export const ListClass = () => {
    const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = () => {
      fetch('http://localhost:3000/geter')
        .then(res => res.json())
        .then(data => {
          setUsers(data.users);
        });
    };

    fetchUsers();
  }, []); 

    return (
        <>
            <div>
                <ul>
                    <h5>Clases Registrados</h5>
                    <ul>
                        {users.map((user, index) => (
                            <li key={index}>{user.nombre}</li>
                        ))}
                    </ul>
                </ul>
            </div>
        </>
    )
}
