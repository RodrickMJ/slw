import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/homePage/HomePage';
import { FormRegister } from './components/pages/FormRegister/FormRegister';
import { LoginForm } from './components/pages/LoginForm/LoginForm';
import ClassDetail from './components/pages/ClassDetail/ClassDetail';
import { CreateClassForm } from './components/pages/CreateClassForm/CreateClassForm';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registro" element={<FormRegister />} />
        <Route path="/inicio" element={<HomePage />} />
        <Route path="/classes/:id" element={<ClassDetail />} />
        <Route path="/crear-clase" element={<CreateClassForm />} />
      </Routes>
    </Router>
  );
};

export default App;
