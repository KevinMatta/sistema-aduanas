import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesPorPantallaComponent } from './roles-por-pantalla.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormContactoComponent', () => {
  let component: RolesPorPantallaComponent;
  let fixture: ComponentFixture<RolesPorPantallaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesPorPantallaComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesPorPantallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
