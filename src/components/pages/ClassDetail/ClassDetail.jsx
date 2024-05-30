import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './classDetail.css';

const ClassDetail = () => {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/classes/${id}`)
      .then((response) => response.json())
      .then((data) => setClassDetail(data))
      .catch((error) => console.error('Error fetching class detail:', error));
  }, [id]);

  if (!classDetail) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="classDetail">
      <h2>{classDetail.class_name}</h2>
      <p>Profesor: {classDetail.teacher}</p>
      {/* Aquí puedes añadir más detalles y funcionalidad de la clase */}
    </div>
  );
};

export default ClassDetail;
