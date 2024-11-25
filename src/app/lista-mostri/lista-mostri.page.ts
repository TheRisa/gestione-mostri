import { Component, OnInit } from '@angular/core';
import { Personaggio } from '../models';

@Component({
  selector: 'app-lista-mostri',
  templateUrl: './lista-mostri.page.html',
  styleUrls: ['./lista-mostri.page.scss']
})
export class ListaMostriPage implements OnInit {
  /** Lista dei personaggi da visualizzare */
  public listaPersonaggi: Personaggio[] = [];
  /** Indice del personaggio selezioanto */
  public selectedIndex: number | undefined = undefined;
  /** NgModel per i danni */
  public danni: number | undefined = undefined;
  /** NgModel per i danni puri */
  public danniPuri: number | undefined = undefined;
  /** NgModel per le cure */
  public cure: number | undefined = undefined;
  /** NgModel per gli scudi */
  public scudi: number | undefined = undefined;

  /** Costruttore della classe */
  constructor() {}

  /** Metodo onInit */
  ngOnInit(): void {
    this.listaPersonaggi = [
      {
        abilita: [
          {
            value: 'asd'
          },
          {
            value: 'qwe'
          },
          {
            value: 'azxcsd'
          },
          {
            value: 'ghjk'
          }
        ],
        rid: 5,
        ridMax: 8,
        dur: 3,
        durMax: 10,
        hpAttuali: 50,
        pfTmpAttuali: 30,
        hpMax: 100,
        note: [
          {
            value: 'aa'
          },
          {
            value: 'ccc'
          },
          {
            value: 'fff'
          }
        ],
        nome: 'Prova mostro 2',
        rageType: 'vincolato'
      },
      {
        abilita: [
          {
            value: 'asd'
          },
          {
            value: 'qwe'
          },
          {
            value: 'azxcsd'
          },
          {
            value: 'ghjk'
          }
        ],
        rid: 5,
        ridMax: 8,
        dur: 3,
        durMax: 10,
        hpAttuali: 50,
        pfTmpAttuali: 30,
        hpMax: 100,
        note: [
          {
            value: 'aa'
          },
          {
            value: 'ccc'
          },
          {
            value: 'fff'
          }
        ],
        nome: 'Prova mostro 2',
        rageType: 'vincolato'
      }
    ];
  }

  /**
   * Click sulla card del personaggio. Lo attiva
   */
  public attivaPersonaggio(index: number): void {
    if (index < 0 || index >= this.listaPersonaggi.length) {
      return;
    }

    // Se clicco su quello già selezionato allora lo collasso
    if (this.selectedIndex === index) {
      this.selectedIndex = undefined;
      return;
    }

    // Aggiorno index e resetto i model
    this.selectedIndex = index;
    this.danni = undefined;
    this.danniPuri = undefined;
    this.cure = undefined;
    this.scudi = undefined;
  }

  /**
   * Metodo per eliminare un personaggio
   *
   * @param index Indice del personaggio da eliminare
   */
  public delete(index: number): void {
    if (index === this.selectedIndex) {
      this.selectedIndex = 0;
    }
    this.listaPersonaggi.splice(index, 1);
  }

  public addPg(): void {}

  /**
   * Metodo per calcolare i danni inseriti
   *
   * @param index Indice per pesonaggio su cui aggiungere i danni
   */
  public calcolaDanni(index: number): void {
    if (!this.danni || this.danni < 0 || index < 0 || index >= this.listaPersonaggi.length) {
      return;
    }

    // Per prima cosa assorbo i danni con i pf tmp
    this.listaPersonaggi[index].pfTmpAttuali = this.listaPersonaggi[index].pfTmpAttuali - this.danni;

    // Se i pf tmp sono sotto 0 allora devo prima applicare l'armor poi i danni ai pf attuali
    if (this.listaPersonaggi[index].pfTmpAttuali < 0) {
      // Avanzo dei danni dai pf tmp (il danno è l'overflow cambiato di segno)
      let overflowDanno = this.listaPersonaggi[index].pfTmpAttuali * -1;
      // Evito che i pf tmp siano < 0
      this.listaPersonaggi[index].pfTmpAttuali = 0;

      // Applico la rid
      overflowDanno = overflowDanno - this.listaPersonaggi[index].rid;
      // Se l'overflow supera la dur, perdo un punto dur
      if (overflowDanno > 0) {
        this.listaPersonaggi[index].dur = this.listaPersonaggi[index].dur - 1;
      }
      // Evito danni negativi
      if (overflowDanno < 0) {
        overflowDanno = 0;
      }
      // A questo punto faccio danni agli hp effettivi
      this.listaPersonaggi[index].hpAttuali = this.listaPersonaggi[index].hpAttuali - overflowDanno;
    }
  }

  /**
   * Applica danni puri al personaggio
   *
   * @param index Indice del personaggio danneggiato
   */
  public calcolaDanniPuri(index: number): void {
    if (!this.danniPuri || this.danniPuri < 0 || index < 0 || index >= this.listaPersonaggi.length) {
      return;
    }

    // I danni puri bypassano tutte le difese
    this.listaPersonaggi[index].hpAttuali = this.listaPersonaggi[index].hpAttuali - this.danniPuri;
  }

  /**
   * Applica cure al personaggio
   *
   * @param index Indice del personaggio curato
   */
  public calcolaCure(index: number): void {
    if (!this.cure || this.cure < 0 || index < 0 || index >= this.listaPersonaggi.length) {
      return;
    }

    // I danni puri bypassano tutte le difese
    this.listaPersonaggi[index].hpAttuali = this.listaPersonaggi[index].hpAttuali + this.cure;
    // Evito overflow degli hp
    if (this.listaPersonaggi[index].hpAttuali > this.listaPersonaggi[index].hpMax) {
      this.listaPersonaggi[index].hpAttuali = this.listaPersonaggi[index].hpMax;
    }
  }

  /**
   * Applica scudi al personaggio
   *
   * @param index Indice del personaggio scudato
   */
  public calcolaScudi(index: number): void {
    if (!this.scudi || this.scudi < 0 || index < 0 || index >= this.listaPersonaggi.length) {
      return;
    }

    // I danni puri bypassano tutte le difese
    this.listaPersonaggi[index].pfTmpAttuali = this.listaPersonaggi[index].pfTmpAttuali + this.scudi;
    // Evito overflow degli hp
    if (this.listaPersonaggi[index].pfTmpAttuali > this.listaPersonaggi[index].hpMax / 2) {
      this.listaPersonaggi[index].pfTmpAttuali = this.listaPersonaggi[index].hpMax / 2;
    }
  }
}
