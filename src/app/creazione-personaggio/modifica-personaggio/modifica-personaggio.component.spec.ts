import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModificaPersonaggioComponent } from './modifica-personaggio.component';

describe('ModificaPersonaggioComponent', () => {
  let component: ModificaPersonaggioComponent;
  let fixture: ComponentFixture<ModificaPersonaggioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaPersonaggioComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificaPersonaggioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
