export type Priorita = 'bassa' | 'media' | 'alta';

export type Categoria = 
  | 'buca_stradale'
  | 'illuminazione'
  | 'rifiuti'
  | 'vandalismo'
  | 'marciapiede'
  | 'traffico'
  | 'altro';

export interface Segnalazione {
  id: string;
  categoria: Categoria;
  descrizione: string;
  luogo: string;
  priorita: Priorita;
  dataOra: string;
  stato: 'in_attesa' | 'in_lavorazione' | 'completata';
  cittadino: string;
}