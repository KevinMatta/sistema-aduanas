import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComercianteIndividualComponent } from './form-comerciante-individual.component';

describe('FormComercianteIndividualComponent', () => {
  let component: FormComercianteIndividualComponent;
  let fixture: ComponentFixture<FormComercianteIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComercianteIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComercianteIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
