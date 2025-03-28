import { Component, OnInit } from '@angular/core';
import { Personaggio } from '../models';
import { CombactService, StorageService } from '../services';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ModificaPersonaggioComponent } from './modifica-personaggio/modifica-personaggio.component';
import { LISTA_PERSONAGGI } from '../constants';

@Component({
  selector: 'app-creazione-personaggio',
  templateUrl: './creazione-personaggio.page.html',
  styleUrls: ['./creazione-personaggio.page.scss']
})
export class CreazionePersonaggioPage implements OnInit {
  /** NgModel per json di creazione */
  public jsonCreazione = '';

  /** Lista dei personaggi da visualizzare */
  public listaPersonaggi: Personaggio[] = [];

  /** Indice del personaggio selezioanto */
  public selectedIndex: number | undefined = undefined;

  /** Costruttore della classe */
  constructor(
    private combattimentoService: CombactService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private storageService: StorageService
  ) {}

  /** Metodo onInit */
  ngOnInit() {
    const storageList: Personaggio[] | null = this.storageService.get(LISTA_PERSONAGGI);
    this.listaPersonaggi = storageList ? storageList : [];
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
   * Creazione di un nuovo mostro
   */
  public async creaNuovo(): Promise<void> {
    // Apro modale
    const modal = await this.modalCtrl.create({
      component: ModificaPersonaggioComponent,
      componentProps: { title: 'Creazione Personaggio' }
    });
    modal.present();

    // Aggiungo personaggio
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      this.controllaEInserisciPersonaggio(data);
    }
  }

  /**
   * Creazione di nuovo mostro partendo da json
   */
  public async creaNuovoDaJson(): Promise<void> {
    // Nessun json inserito
    if (!this.jsonCreazione) {
      const toastNoJson = await this.toastController.create({
        message: 'Inserire un json',
        duration: 3000
      });
      toastNoJson.present();
      return;
    }

    // Conversione input in json
    let json = null;
    try {
      json = JSON.parse(this.jsonCreazione);
    } catch {
      const toastJsonErrato = await this.toastController.create({
        message: 'Il json inserito non è valido',
        duration: 3000
      });
      toastJsonErrato.present();
      return;
    }

    // Aggiunta personaggio
    if (json) {
      this.controllaEInserisciPersonaggio(json);
      this.jsonCreazione = '';
    }
  }

  /**
   * Passando un personaggio verifica che sia valido, non ripetuto e lo inserisce in storage e lista
   *
   * @param personaggio Personaggio da inserire
   * @returns
   */
  private async controllaEInserisciPersonaggio(personaggio: Personaggio): Promise<void> {
    // Personaggio già presente
    if (this.listaPersonaggi.find((pers) => pers.nome === personaggio.nome)) {
      const toastJsonErrato = await this.toastController.create({
        message: `${personaggio.nome} è già stato inserito`,
        duration: 3000
      });
      toastJsonErrato.present();
      return;
    }

    this.listaPersonaggi.push(personaggio);
    this.storageService.set(LISTA_PERSONAGGI, this.listaPersonaggi);
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
    this.storageService.set(LISTA_PERSONAGGI, this.listaPersonaggi);
  }

  /**
   * Apre modale di conferma delete, poi elimina personaggio
   *
   * @param index Indice del personaggio da eliminare
   */
  public async delete(index: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Conferma',
      message: 'Sei sicuro di voler procedere?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel'
        },
        {
          text: 'Conferma',
          handler: () => {
            this.listaPersonaggi.splice(index, 1);
            this.storageService.set(LISTA_PERSONAGGI, this.listaPersonaggi);
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Apre modale di modifica per personaggio
   *
   * @param index Indice del personaggio da modificare
   */
  public async modify(index: number): Promise<void> {
    if (index < 0 || index >= this.listaPersonaggi.length) {
      return;
    }

    // Apro modale (tolgo il riferimento all'oggetto)
    const modal = await this.modalCtrl.create({
      component: ModificaPersonaggioComponent,
      componentProps: {
        title: 'Modifica Personaggio',
        personaggio: JSON.parse(JSON.stringify(this.listaPersonaggi[index]))
      }
    });
    modal.present();

    // Modifico dati
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      this.listaPersonaggi[index] = data;
      this.storageService.set(LISTA_PERSONAGGI, this.listaPersonaggi);
    }
  }
}
