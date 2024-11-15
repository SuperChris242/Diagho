import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
}

interface Conflict {
  event: Event;
  conflicts_with: Event[];
}

const ConflictList: React.FC = () => {
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConflicts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8000/api/events/find_conflicts');
        console.log('Réponse de l\'API:', response.data);
        
        setConflicts(response.data); // Assurez-vous que les données sont bien stockées dans l'état
      } catch (err) {
        console.error('Erreur lors de la récupération des conflits:', err);
        setError('Erreur lors de la récupération des conflits');
      } finally {
        setLoading(false);
      }
    };
    
    fetchConflicts();
  }, []);

  return (
    <div>
      {loading && <p>Chargement des conflits...</p>}
      {error && <p>{error}</p>}
      
      {conflicts.length === 0 ? (
        <p>Aucun conflit trouvé.</p>
      ) : (
        conflicts.map((conflict) => (
          <div key={conflict.event.id} className="p-3 border border-gray-300 rounded my-2">
            <h3 className="text-md font-semibold">Conflit ID: {conflict.event.id}</h3>
            {conflict.conflicts_with.length > 0 ? (
              <ul>
                {conflict.conflicts_with.map((conflictingEvent) => (
                  <li key={conflictingEvent.id}>
                    <p>
                      Nom: {conflictingEvent.name}, Début: {conflictingEvent.start_time}, Fin: {conflictingEvent.end_time}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun événement en conflit pour cet ID.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ConflictList;
