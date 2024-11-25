import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreazionePersonaggioPage } from './creazione-personaggio.page';

describe('CreazionePersonaggioPage', () => {
  let component: CreazionePersonaggioPage;
  let fixture: ComponentFixture<CreazionePersonaggioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreazionePersonaggioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
