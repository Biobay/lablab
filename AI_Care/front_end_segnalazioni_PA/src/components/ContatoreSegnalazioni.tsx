import React from 'react';
import { Segnalazione } from '../types';
import { Users } from 'lucide-react';

interface ContatoreSegnalazioniProps {
  segnalazioni: Segnalazione[];
}

export const ContatoreSegnalazioni: React.FC<ContatoreSegnalazioniProps> = ({ segnalazioni }) => {
  const cittadiniUnici = new Set(segnalazioni.map(s => s.cittadino)).size;
  const segnalazioniOggi = segnalazioni.filter(s => {
    const oggi = new Date().toISOString().split('T')[0];
    return s.dataOra.startsWith(oggi);
  }).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Cittadini Attivi</p>
              <p className="text-2xl font-bold">{cittadiniUnici}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Segnalazioni Oggi</p>
            <p className="text-xl font-semibold text-purple-600">{segnalazioniOggi}</p>
          </div>
        </div>
      </div>
    </div>
  );
};