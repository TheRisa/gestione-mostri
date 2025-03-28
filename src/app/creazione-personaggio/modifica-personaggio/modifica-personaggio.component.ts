import { Component, OnInit } from '@angular/core';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { Personaggio } from 'src/app/models';

@Component({
  selector: 'app-modifica-personaggio',
  templateUrl: './modifica-personaggio.component.html',
  styleUrls: ['./modifica-personaggio.component.scss']
})
export class ModificaPersonaggioComponent implements OnInit {
  /** Titolo da mostrare */
  public title = '';

  /** Dati del personaggio inserito */
  public personaggio: Personaggio = {
    abilita: [
      {
        value: ''
      }
    ],
    dur: 0,
    durMax: 0,
    hpAttuali: 0,
    hpMax: 0,
    nome: '',
    dA: '',
    dM: '',
    note: [
      {
        value: ''
      }
    ],
    pfTmpAttuali: 0,
    rapBase: 0,
    rid: 0,
    ridMax: 0,
    rageType: '',
    critArma: 2,
    txcAttaccoBase: 8
  };

  /** Costruttore della classe */
  constructor(private modalCtrl: ModalController, private toastController: ToastController) {}

  /** Metodo onInit */
  ngOnInit(): void {}

  /**
   * Dismiss modale
   */
  public cancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  /**
   * Metodo al click su conferma
   */
  public async confirm(): Promise<void> {
    // Controllo campi obbligatori con messaggio di errore
    if (this.checkEmpty()) {
      const toast = await this.toastController.create({
        message: 'Alcuni campi obbligatori (*) non sono stati correttamente compilati',
        duration: 2500
      });

      await toast.present();
      return;
    }

    // Rimuovo abilita e note vuote
    this.personaggio.abilita = this.personaggio.abilita.filter((abilita) => !!abilita.value);
    this.personaggio.note = this.personaggio.note.filter((nota) => !!nota.value);
    this.modalCtrl.dismiss(this.personaggio, 'confirm');
  }

  /**
   * Controlla se il form è valido
   *
   * @returns True se ci c'è almeno un campo obbligatorio non compilato correttamente
   */
  private checkEmpty(): boolean {
    return (
      !this.personaggio.nome ||
      !this.personaggio.hpMax ||
      this.personaggio.durMax == undefined ||
      this.personaggio.ridMax == undefined ||
      !this.personaggio.dA ||
      !this.personaggio.rapBase ||
      !this.personaggio.rageType ||
      !this.personaggio.critArma ||
      !this.personaggio.txcAttaccoBase
    );
  }

  /**
   * Aggiunge una abilità vuota
   */
  public aggiungiAbilita(): void {
    this.personaggio.abilita.push({
      value: ''
    });
  }

  /**
   * Aggiunge una nota vuota
   */
  public aggiungiNota(): void {
    this.personaggio.note.push({
      value: ''
    });
  }
}
