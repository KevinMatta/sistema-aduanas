import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArancelesComponent } from './form-aranceles.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormEstadosComponent', () => {
  let component: FormArancelesComponent;
  let fixture: ComponentFixture<FormArancelesComponent>;




  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormArancelesComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArancelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
