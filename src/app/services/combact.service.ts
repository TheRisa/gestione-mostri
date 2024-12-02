import { Injectable } from '@angular/core';
import { Personaggio } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CombactService {
  /** Lista dei personaggi attualmente in combattimento */
  private listaPersonaggiAttivi: Personaggio[] = [];

  /** Costruttore della classe */
  constructor() {}

  /**
   * Getter per listaPersonaggi
   */
  get listaPersonaggi(): Personaggio[] {
    return this.listaPersonaggiAttivi;
  }

  /**
   * Passando un personaggio si aggiunge alla lista del combattimento
   *
   * @param personaggio Personaggio da aggiungere
   */
  public addPersonaggio(personaggio: Personaggio): void {
    // Elimino i riferimenti
    const personaggioClone: Personaggio = JSON.parse(JSON.stringify(personaggio));

    // Resetto i valori
    personaggioClone.hpAttuali = personaggioClone.hpMax;
    personaggioClone.pfTmpAttuali = 0;
    personaggioClone.rid = personaggioClone.ridMax;
    personaggioClone.dur = personaggioClone.durMax;
    personaggioClone.abilita.forEach((abilita) => (abilita.read = false));
    personaggioClone.note.forEach((nota) => (nota.read = false));
    // Calcolo l'index
    let duplicati = 0;
    this.listaPersonaggiAttivi.forEach((pers) => {
      if (pers.nome.includes(personaggioClone.nome)) {
        duplicati = pers.index && pers.index > duplicati ? pers.index : duplicati;
      }
    });
    personaggioClone.index = duplicati + 1;

    // Aggiungo il pg
    this.listaPersonaggiAttivi.push(personaggioClone);
  }

  /**
   * Rimuove il personaggio con l'indice passato
   *
   * @param index Indice del personaggio da rimuovere
   */
  public rimuoviPersonaggio(index: number): void {
    if (index < 0 || index >= this.listaPersonaggiAttivi.length) {
      return;
    }

    this.listaPersonaggi.splice(index, 1);
  }

  /**
   * Metodo per il reset totale della lista dei personaggi attivi
   */
  public resetAll(): void {
    this.listaPersonaggiAttivi = [];
  }

  /**
   * Metodo per calcolare i danni inseriti
   *
   * @param index Indice per pesonaggio su cui aggiungere i danni
   * @param danni Danni inflitti
   */
  public applicaDanni(index: number, danni: number): void {
    if (!danni || danni < 0 || index < 0 || index >= this.listaPersonaggiAttivi.length) {
      return;
    }

    // Per prima cosa assorbo i danni con i pf tmp
    this.listaPersonaggiAttivi[index].pfTmpAttuali = this.listaPersonaggiAttivi[index].pfTmpAttuali - danni;

    // Se i pf tmp sono sotto 0 allora devo prima applicare l'armor poi i danni ai pf attuali
    if (this.listaPersonaggiAttivi[index].pfTmpAttuali < 0) {
      // Avanzo dei danni dai pf tmp (il danno è l'overflow cambiato di segno)
      let overflowDanno = this.listaPersonaggiAttivi[index].pfTmpAttuali * -1;
      // Evito che i pf tmp siano < 0
      this.listaPersonaggiAttivi[index].pfTmpAttuali = 0;

      // Applico la rid
      overflowDanno = overflowDanno - this.listaPersonaggiAttivi[index].rid;
      // Se l'overflow supera la dur, perdo un punto dur
      if (overflowDanno > 0) {
        this.listaPersonaggiAttivi[index].dur = this.listaPersonaggiAttivi[index].dur - 1;
      }
      // Evito danni negativi
      if (overflowDanno < 0) {
        overflowDanno = 0;
      }
      // A questo punto faccio danni agli hp effettivi
      this.listaPersonaggiAttivi[index].hpAttuali = this.listaPersonaggiAttivi[index].hpAttuali - overflowDanno;
    }
  }

  /**
   * Applica danni magici al personaggio
   *
   * @param index Indice del personaggio danneggiato
   * @param danniMagici Danni magici inflitti
   */
  public applicaDanniMagici(index: number, danniMagici: number): void {
    if (!danniMagici || danniMagici < 0 || index < 0 || index >= this.listaPersonaggiAttivi.length) {
      return;
    }

    // Per prima cosa assorbo i danni con i pf tmp
    this.listaPersonaggiAttivi[index].pfTmpAttuali = this.listaPersonaggiAttivi[index].pfTmpAttuali - danniMagici;

    // Se i pf tmp sono sotto 0 allora devo prima applicare l'armor poi i danni ai pf attuali
    if (this.listaPersonaggiAttivi[index].pfTmpAttuali < 0) {
      // Avanzo dei danni dai pf tmp (il danno è l'overflow cambiato di segno)
      let overflowDanno = this.listaPersonaggiAttivi[index].pfTmpAttuali * -1;
      // Evito che i pf tmp siano < 0
      this.listaPersonaggiAttivi[index].pfTmpAttuali = 0;

      // A questo punto faccio danni agli hp effettivi
      this.listaPersonaggiAttivi[index].hpAttuali = this.listaPersonaggiAttivi[index].hpAttuali - overflowDanno;
    }
  }
  /**
   * Applica danni puri al personaggio
   *
   * @param index Indice del personaggio danneggiato
   * @param danniPuri Danni puri inflitti
   */
  public applicaDanniPuri(index: number, danniPuri: number): void {
    if (!danniPuri || danniPuri < 0 || index < 0 || index >= this.listaPersonaggiAttivi.length) {
      return;
    }

    // I danni puri bypassano tutte le difese
    this.listaPersonaggiAttivi[index].hpAttuali = this.listaPersonaggiAttivi[index].hpAttuali - danniPuri;
  }

  /**
   * Applica cure al personaggio
   *
   * @param index Indice del personaggio curato
   * @param cure Cure effettuate
   */
  public applicaCure(index: number, cure: number): void {
    if (!cure || cure < 0 || index < 0 || index >= this.listaPersonaggiAttivi.length) {
      return;
    }

    // I danni puri bypassano tutte le difese
    this.listaPersonaggiAttivi[index].hpAttuali = this.listaPersonaggiAttivi[index].hpAttuali + cure;
    // Evito overflow degli hp
    if (this.listaPersonaggiAttivi[index].hpAttuali > this.listaPersonaggiAttivi[index].hpMax) {
      this.listaPersonaggiAttivi[index].hpAttuali = this.listaPersonaggiAttivi[index].hpMax;
    }
  }

  /**
   * Applica scudi al personaggio
   *
   * @param index Indice del personaggio scudato
   * @param scudi Scudi ricevuti
   */
  public applicaScudi(index: number, scudi: number): void {
    if (!scudi || scudi < 0 || index < 0 || index >= this.listaPersonaggi.length) {
      return;
    }

    // I danni puri bypassano tutte le difese
    this.listaPersonaggi[index].pfTmpAttuali = this.listaPersonaggi[index].pfTmpAttuali + scudi;
    // Evito overflow degli hp
    if (this.listaPersonaggi[index].pfTmpAttuali > this.listaPersonaggi[index].hpMax / 2) {
      this.listaPersonaggi[index].pfTmpAttuali = this.listaPersonaggi[index].hpMax / 2;
    }
  }
}
