import React, { useState } from 'react';
import EventList from './components/EventList';
import AddEvent from './components/AddEvent';
import ConflictList from './components/ConflictList';

const App: React.FC = () => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [showConflicts, setShowConflicts] = useState<boolean>(false);

  const handleEventUpdated = () => {
    setRefresh(!refresh); // Rafraîchir la liste des événements
  };

  const handleToggleConflicts = () => {
    setShowConflicts(!showConflicts); // Afficher/masquer la liste des conflits
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Gestion des événements</h1>

      {/* Formulaire pour ajouter un événement */}
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg mb-6">
        <AddEvent onEventAdded={handleEventUpdated} />
      </div>

      {/* Liste des événements */}
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg mb-6">
        <EventList refresh={refresh} onEventUpdated={handleEventUpdated} />
      </div>

      {/* Bouton pour afficher/masquer la liste des conflits */}
      <button
        onClick={handleToggleConflicts}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        {showConflicts ? 'Masquer les conflits' : 'Afficher les conflits'}
      </button>

      {/* Liste des conflits affichée lorsque le bouton est cliqué */}
      {showConflicts && <ConflictList />}
    </div>
  );
};

export default App;
