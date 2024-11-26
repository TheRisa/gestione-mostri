export interface Personaggio {
  hpMax: number;
  hpAttuali: number;
  pfTmpAttuali: number;
  rid: number;
  ridMax: number;
  dur: number;
  durMax: number;
  note: readString[];
  abilita: readString[];
  nome: string;
  index?: number;
  rageType?: 'vincolato' | 'dipendente' | 'assuefatto' | 'immune';
}

export interface readString {
  value: string;
  read?: boolean;
}
