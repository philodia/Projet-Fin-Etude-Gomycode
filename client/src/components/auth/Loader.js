// Loader.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Loader.css'; // Vous pouvez personnaliser le style si nécessaire

const Loader = () => (
  <div className="loader">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Chargement...</span>
    </div>
  </div>
);

export default Loader;
