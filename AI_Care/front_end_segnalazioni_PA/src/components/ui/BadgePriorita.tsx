import React from 'react';
import { Segnalazione } from '../../types';

interface BadgePrioritaProps {
  priorita: Segnalazione['priorita'];
}

export const BadgePriorita: React.FC<BadgePrioritaProps> = ({ priorita }) => {
  const colori = {
    alta: 'bg-red-100 text-red-800',
    media: 'bg-yellow-100 text-yellow-800',
    bassa: 'bg-green-100 text-green-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${colori[priorita]}`}>
      {priorita.charAt(0).toUpperCase() + priorita.slice(1)}
    </span>
  );
};