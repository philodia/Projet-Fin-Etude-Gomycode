import React, { useState } from 'react';

const Setting = () => {
  const [settings, setSettings] = useState({
    primaryColor: '#007bff', // Couleur primaire par défaut
    textSize: '16px', // Taille de texte par défaut
    backgroundColor: '#ffffff', // Couleur d'arrière-plan par défaut
    borderRadius: '4px' // Rayon de bordure par défaut
  });

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
  };

  // Fonction pour enregistrer les paramètres (peut être modifiée pour utiliser une API ou localStorage)
  const handleSave = (e) => {
    e.preventDefault();
    // Enregistrement des paramètres (localStorage, API, etc.)
    localStorage.setItem('dashboardSettings', JSON.stringify(settings));
    alert('Paramètres sauvegardés avec succès!');
  };

  return (
    <div className="container mt-5">
      <h2>Paramètres des Tableaux de Bord</h2>
      <form onSubmit={handleSave}>
        <div className="form-group mb-3">
          <label>Couleur Primaire</label>
          <input
            type="color"
            name="primaryColor"
            value={settings.primaryColor}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group mb-3">
          <label>Taille du Texte</label>
          <input
            type="number"
            name="textSize"
            value={settings.textSize.replace('px', '')} // Retirer 'px' pour le champ input
            onChange={handleChange}
            className="form-control"
            min="10"
            max="30"
          />
          <small className="form-text text-muted">Entrez la taille du texte en pixels.</small>
        </div>

        <div className="form-group mb-3">
          <label>Couleur d'Arrière-plan</label>
          <input
            type="color"
            name="backgroundColor"
            value={settings.backgroundColor}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group mb-3">
          <label>Rayon de Bordure</label>
          <input
            type="number"
            name="borderRadius"
            value={settings.borderRadius.replace('px', '')} // Retirer 'px' pour le champ input
            onChange={handleChange}
            className="form-control"
            min="0"
            max="50"
          />
          <small className="form-text text-muted">Entrez le rayon de bordure en pixels.</small>
        </div>

        <button type="submit" className="btn btn-primary">Sauvegarder les Paramètres</button>
      </form>

      <hr />

      <h3>Aperçu des Modifications</h3>
      <div
        style={{
          backgroundColor: settings.backgroundColor,
          color: settings.primaryColor,
          fontSize: settings.textSize,
          borderRadius: settings.borderRadius,
          padding: '20px',
          marginTop: '20px'
        }}
      >
        <h4>Aperçu</h4>
        <p>Ceci est un aperçu de votre tableau de bord avec les paramètres que vous avez choisis.</p>
      </div>
    </div>
  );
};

export default Setting;
