import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaMostriPage } from './lista-mostri.page';

describe('ListaMostriPage', () => {
  let component: ListaMostriPage;
  let fixture: ComponentFixture<ListaMostriPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMostriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
