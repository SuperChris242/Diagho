import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
    id: number;
    name: string;
    start_time: string;
    end_time: string;
}

interface EventListProps {
    refresh: boolean;
    onEventUpdated: () => void;
}

const EventList: React.FC<EventListProps> = ({ refresh, onEventUpdated }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [search, setSearch] = useState('');
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [editedName, setEditedName] = useState('');
    const [editedStartTime, setEditedStartTime] = useState('');
    const [editedEndTime, setEditedEndTime] = useState('');

    useEffect(() => {
        fetchEvents();
    }, [refresh]); // Recharger lorsque `refresh` change

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/events/');
            setEvents(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des événements:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8000/api/events/${id}/`);
            onEventUpdated(); // Notifier le parent pour rafraîchir
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'événement:', error);
        }
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setEditedName(event.name);
        setEditedStartTime(event.start_time);
        setEditedEndTime(event.end_time);
    };

    const handleEditSave = async () => {
        if (editingEvent) {
            try {
                await axios.put(`http://localhost:8000/api/events/${editingEvent.id}/`, {
                    name: editedName,
                    start_time: editedStartTime,
                    end_time: editedEndTime
                });
                setEditingEvent(null);
                onEventUpdated(); // Notifier le parent pour rafraîchir
            } catch (error) {
                console.error('Erreur lors de la mise à jour de l\'événement:', error);
            }
        }
    };

    const handleEditCancel = () => {
        setEditingEvent(null);
    };

    const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(search.toLowerCase()) || 
        new Date(event.start_time).toLocaleDateString().includes(search) ||
        new Date(event.end_time).toLocaleDateString().includes(search)
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Recherche par nom ou date"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 w-full"
            />
            <ul className="space-y-4 mt-4">
                {filteredEvents.map(event => (
                    <li key={event.id} className="border p-4 flex justify-between">
                        {editingEvent && editingEvent.id === event.id ? (
                            <div className="flex-1 space-y-2">
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    className="border p-2 w-full"
                                />
                                <input
                                    type="datetime-local"
                                    value={editedStartTime}
                                    onChange={(e) => setEditedStartTime(e.target.value)}
                                    className="border p-2 w-full"
                                />
                                <input
                                    type="datetime-local"
                                    value={editedEndTime}
                                    onChange={(e) => setEditedEndTime(e.target.value)}
                                    className="border p-2 w-full"
                                />
                                <div className="flex space-x-2">
                                    <button onClick={handleEditSave} className="bg-green-500 text-white p-2">Enregistrer</button>
                                    <button onClick={handleEditCancel} className="bg-gray-400 text-white p-2">Annuler</button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1">
                                <h3>{event.name}</h3>
                                <p>Début: {new Date(event.start_time).toLocaleString()}</p>
                                <p>Fin: {new Date(event.end_time).toLocaleString()}</p>
                                <div className="flex space-x-2 mt-2">
                                    <button onClick={() => handleEdit(event)} className="bg-yellow-300 p-2">Éditer</button>
                                    <button onClick={() => handleDelete(event.id)} className="bg-red-500 text-white p-2">Supprimer</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
