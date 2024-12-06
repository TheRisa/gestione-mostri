import { Component, OnInit } from '@angular/core';
import { Personaggio } from '../models';
import { CombactService } from '../services';

@Component({
  selector: 'app-lista-mostri',
  templateUrl: './lista-mostri.page.html',
  styleUrls: ['./lista-mostri.page.scss']
})
export class ListaMostriPage implements OnInit {
  /** Indice del personaggio selezioanto */
  public selectedIndex: number | undefined = undefined;
  /** NgModel per i danni */
  public danni: number | undefined = undefined;
  /** NgModel per i danni magici */
  public danniMagici: number | undefined = undefined;
  /** NgModel per i danni puri */
  public danniPuri: number | undefined = undefined;
  /** NgModel per le cure */
  public cure: number | undefined = undefined;
  /** NgModel per gli scudi */
  public scudi: number | undefined = undefined;

  /** Costruttore della classe */
  constructor(public combactService: CombactService) {}

  /** Metodo onInit */
  ngOnInit(): void {}

  /**
   * Click sulla card del personaggio. Lo attiva
   */
  public attivaPersonaggio(index: number): void {
    if (index < 0 || index >= this.combactService.listaPersonaggi.length) {
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
    this.combactService.rimuoviPersonaggio(index);
  }

  /**
   * Reset dei dati del combattimento (svuota tutta la lista)
   */
  public reset(): void {
    this.combactService.resetAll();

    this.selectedIndex = undefined;
    this.danni = undefined;
    this.danniPuri = undefined;
    this.cure = undefined;
    this.scudi = undefined;
  }

  /**
   * Metodo per calcolare i danni inseriti
   *
   * @param index Indice per pesonaggio su cui aggiungere i danni
   */
  public calcolaDanni(index: number): void {
    if (!this.danni || this.danni < 0) {
      return;
    }

    this.combactService.applicaDanni(index, this.danni);
  }

  /**
   * Metodo per calcolare i danni magici inseriti
   *
   * @param index Indice per pesonaggio su cui aggiungere i danni
   */
  public calcolaDanniMagici(index: number): void {
    if (!this.danniMagici || this.danniMagici < 0) {
      return;
    }

    this.combactService.applicaDanniMagici(index, this.danniMagici);
  }

  /**
   * Applica danni puri al personaggio
   *
   * @param index Indice del personaggio danneggiato
   */
  public calcolaDanniPuri(index: number): void {
    if (!this.danniPuri || this.danniPuri < 0) {
      return;
    }

    this.combactService.applicaDanniPuri(index, this.danniPuri);
  }

  /**
   * Applica cure al personaggio
   *
   * @param index Indice del personaggio curato
   */
  public calcolaCure(index: number): void {
    if (!this.cure || this.cure < 0) {
      return;
    }

    this.combactService.applicaCure(index, this.cure);
  }

  /**
   * Applica scudi al personaggio
   *
   * @param index Indice del personaggio scudato
   */
  public calcolaScudi(index: number): void {
    if (!this.scudi || this.scudi < 0) {
      return;
    }

    this.combactService.applicaScudi(index, this.scudi);
  }
}
