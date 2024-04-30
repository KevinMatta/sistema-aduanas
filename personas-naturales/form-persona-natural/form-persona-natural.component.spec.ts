import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPersonaNaturalComponent } from './form-persona-natural.component';

describe('FormPersonaNaturalComponent', () => {
  let component: FormPersonaNaturalComponent;
  let fixture: ComponentFixture<FormPersonaNaturalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPersonaNaturalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPersonaNaturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
