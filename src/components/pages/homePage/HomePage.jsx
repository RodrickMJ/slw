import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassList from '../classList/ClassList';
import { Header } from '../../ui/Header/Header';
import { CreateClassForm } from '../CreateClassForm/CreateClassForm'; 
import './homePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false); 
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handlerCerrarSesion = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const agregarTarea = () => {
    setShowForm(true);
  };

  const cancelarTarea = () => {
    setShowForm(false); 
  };

  return (
    <div>
      <Header content={user?.name} handler={handlerCerrarSesion} handlerPlus={agregarTarea} />
      <ClassList userId={user?._id} />
      {showForm && <div className="modal-overlay"><CreateClassForm onCancel={cancelarTarea} /></div>}
    </div>
  );
};

export default HomePage;
