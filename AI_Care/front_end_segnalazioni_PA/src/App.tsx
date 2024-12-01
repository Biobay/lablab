import React, { useState } from 'react';
import { Segnalazione } from './types';
import { TabellaStatistiche } from './components/statistiche/TabellaStatistiche';
import { ContatoreSegnalazioni } from './components/statistiche/ContatoreSegnalazioni';
import { AlertTriangle, BarChart3, CheckCircle } from 'lucide-react';

const segnalazioniIniziali: Segnalazione[] = [
  {
    id: '1',
    categoria: 'buca_stradale',
    descrizione: 'Buca pericolosa in strada principale',
    luogo: 'Via Roma 123',
    priorita: 'alta',
    dataOra: new Date().toISOString(),
    stato: 'in_attesa',
    cittadino: 'Mario Rossi'
  },
  {
    id: '2',
    categoria: 'illuminazione',
    descrizione: 'Lampione non funzionante',
    luogo: 'Piazza Garibaldi',
    priorita: 'media',
    dataOra: new Date().toISOString(),
    stato: 'in_lavorazione',
    cittadino: 'Laura Bianchi'
  },
  {
    id: '3',
    categoria: 'rifiuti',
    descrizione: 'Cestini straripanti',
    luogo: 'Parco Centrale',
    priorita: 'bassa',
    dataOra: new Date().toISOString(),
    stato: 'completata',
    cittadino: 'Giuseppe Verdi'
  }
];

function App() {
  const [segnalazioni] = useState<Segnalazione[]>(segnalazioniIniziali);

  const segnalazioniAlta = segnalazioni.filter(s => s.priorita === 'alta').length;
  const segnalazioniCompletate = segnalazioni.filter(s => s.stato === 'completata').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Sistema Segnalazioni Cittadine</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <ContatoreSegnalazioni segnalazioni={segnalazioni} />
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Totale Segnalazioni</p>
                <p className="text-2xl font-bold">{segnalazioni.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Priorità Alta</p>
                <p className="text-2xl font-bold">{segnalazioniAlta}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Completate</p>
                <p className="text-2xl font-bold">{segnalazioniCompletate}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Segnalazioni Recenti</h2>
            <TabellaStatistiche segnalazioni={segnalazioni} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;