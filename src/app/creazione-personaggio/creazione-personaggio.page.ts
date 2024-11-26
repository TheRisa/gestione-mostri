import { Component, OnInit } from '@angular/core';
import { Personaggio } from '../models';
import { Router } from '@angular/router';
import { CombactService } from '../services';

@Component({
  selector: 'app-creazione-personaggio',
  templateUrl: './creazione-personaggio.page.html',
  styleUrls: ['./creazione-personaggio.page.scss']
})
export class CreazionePersonaggioPage implements OnInit {
  /** Lista dei personaggi da visualizzare */
  public listaPersonaggi: Personaggio[] = [];
  /** Indice del personaggio selezioanto */
  public selectedIndex: number | undefined = undefined;

  /** Costruttore della classe */
  constructor(private router: Router, private combattimentoService: CombactService) {}

  /** Metodo onInit */
  ngOnInit() {
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
        nome: 'Prova mostro',
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
  }

  /**
   * Creazione di un nuovo mostro (naviga alla pagina)
   */
  public creaNuovo(): void {
    this.router.navigate(['tabs', 'creazione-personaggio', 'inserisci-dati']);
  }

  /**
   * Aggiunge un personaggio al combattimento
   *
   * @param index Indice del personaggio da aggiungere
   */
  public add(index: number): void {
    if (index < 0 || index >= this.listaPersonaggi.length) {
      return;
    }

    this.combattimentoService.addPersonaggio(this.listaPersonaggi[index]);
  }
  public delete(index: number): void {}
  public modify(index: number): void {}
}
