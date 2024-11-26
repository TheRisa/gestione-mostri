import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InserisciDatiMostroComponent } from './inserisci-dati-mostro.component';

describe('InserisciDatiMostroComponent', () => {
  let component: InserisciDatiMostroComponent;
  let fixture: ComponentFixture<InserisciDatiMostroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InserisciDatiMostroComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InserisciDatiMostroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
