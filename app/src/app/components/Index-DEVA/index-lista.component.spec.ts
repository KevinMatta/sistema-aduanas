import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexListaComponent } from './index-lista.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { Usuario } from 'src/app/Models/UsuariosViewModel';

describe('IndexListaComponent', () => {
  let component: IndexListaComponent;
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexListaComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
