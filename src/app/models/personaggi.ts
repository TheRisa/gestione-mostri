export interface Personaggio {
  hpMax: number;
  hpAttuali: number;
  pfTmpAttuali: number;
  rid: number;
  ridMax: number;
  dur: number;
  durMax: number;
  note: readString[];
  dA: string;
  dM?: string;
  abilita: readString[];
  nome: string;
  rapBase: number;
  index?: number;
  rageType: 'vincolato' | 'dipendente' | 'assuefatto' | 'immune' | '';
}

export interface readString {
  value: string;
  read?: boolean;
}
