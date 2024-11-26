import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personaggio } from 'src/app/models';

@Component({
  selector: 'app-inserisci-dati-mostro',
  templateUrl: './inserisci-dati-mostro.component.html',
  styleUrls: ['./inserisci-dati-mostro.component.scss']
})
export class InserisciDatiMostroComponent implements OnInit {
  public personaggio: Personaggio = {
    abilita: [],
    dur: 0,
    durMax: 0,
    hpAttuali: 0,
    hpMax: 0,
    nome: '',
    note: [],
    pfTmpAttuali: 0,
    rid: 0,
    ridMax: 0
  };

  /** Costruttore della classe */
  constructor(private router: Router) {}

  /** Metodo onInit */
  ngOnInit(): void {}

  public back(): void {
    this.router.navigate(['tabs', 'creazione-personaggio']);
  }
}
