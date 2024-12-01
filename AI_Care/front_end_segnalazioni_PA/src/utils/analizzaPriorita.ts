import { Categoria, Priorita } from '../types';

export function analizzaPriorita(descrizione: string, categoria: Categoria): Priorita {
  const paroleChiave = {
    alta: ['pericoloso', 'emergenza', 'pericolo', 'immediato', 'sicurezza', 'urgente'],
    media: ['rotto', 'danneggiato', 'problema', 'riparazione'],
    bassa: ['piccolo', 'lieve', 'estetico', 'minore']
  };

  const testo = descrizione.toLowerCase();
  
  if (paroleChiave.alta.some(parola => testo.includes(parola))) {
    return 'alta';
  }

  if (categoria === 'buca_stradale' || categoria === 'illuminazione') {
    return 'media';
  }

  if (paroleChiave.media.some(parola => testo.includes(parola))) {
    return 'media';
  }

  return 'bassa';
}