import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPaisesComponent } from './form-paises.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormContactoComponent', () => {
  let component: FormPaisesComponent;
  let fixture: ComponentFixture<FormPaisesComponent>;




  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPaisesComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPaisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
