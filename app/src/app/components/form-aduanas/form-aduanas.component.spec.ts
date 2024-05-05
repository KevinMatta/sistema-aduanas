import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAduanasComponent } from './form-aduanas.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormContactoComponent', () => {
  let component: FormAduanasComponent;
  let fixture: ComponentFixture<FormAduanasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAduanasComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAduanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
