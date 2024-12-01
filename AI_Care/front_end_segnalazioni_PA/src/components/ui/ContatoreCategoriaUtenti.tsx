import React from 'react';
import { Segnalazione } from '../../types';
import { Users } from 'lucide-react';

interface ContatoreCategoriaUtentiProps {
  segnalazioni: Segnalazione[];
  categoria: Segnalazione['categoria'];
}

export const ContatoreCategoriaUtenti: React.FC<ContatoreCategoriaUtentiProps> = ({ segnalazioni, categoria }) => {
  const cittadiniUnici = new Set(
    segnalazioni
      .filter(s => s.categoria === categoria)
      .map(s => s.cittadino)
  ).size;

  return (
    <div className="flex items-center gap-1 text-gray-600">
      <Users className="w-4 h-4" />
      <span className="text-sm">{cittadiniUnici}</span>
    </div>
  );
};