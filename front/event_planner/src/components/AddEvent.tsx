// src/components/AddEvent.tsx
import React, { useState } from 'react';
import axios from 'axios';

const AddEvent: React.FC<{ onEventAdded: () => void }> = ({ onEventAdded }) => {
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/events/', { name, start_time: startTime, end_time: endTime });
            setName('');
            setStartTime('');
            setEndTime('');
            onEventAdded();  // informer le parent qu'un événement a été ajouté
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'événement", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Nom de l'événement"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full"
                required
            />
            <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border p-2 w-full"
                required
            />
            <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border p-2 w-full"
                required
            />
            <button type="submit" className="bg-blue-500 text-white p-2">Ajouter l'événement</button>
        </form>
    );
};

export default AddEvent;