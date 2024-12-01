import React from 'react';
import { Segnalazione } from '../types';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';

interface TabellaStatisticheProps {
  segnalazioni: Segnalazione[];
}

const BadgePriorita: React.FC<{ priorita: Segnalazione['priorita'] }> = ({ priorita }) => {
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

export const TabellaStatistiche: React.FC<TabellaStatisticheProps> = ({ segnalazioni }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrizione</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Luogo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priorità</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stato</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cittadino</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {segnalazioni.map((segnalazione) => (
            <tr key={segnalazione.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="capitalize">{segnalazione.categoria.replace('_', ' ')}</span>
              </td>
              <td className="px-6 py-4">{segnalazione.descrizione}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  {segnalazione.luogo}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <BadgePriorita priorita={segnalazione.priorita} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-sm font-medium
                  ${segnalazione.stato === 'completata' ? 'bg-green-100 text-green-800' : 
                    segnalazione.stato === 'in_lavorazione' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'}`}>
                  {segnalazione.stato.replace('_', ' ')}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {segnalazione.cittadino}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  {new Date(segnalazione.dataOra).toLocaleDateString('it-IT')}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};