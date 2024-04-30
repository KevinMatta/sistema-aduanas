import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeclaracionValorComponent } from './form-declaracion-valor.component';

describe('FormDeclaracionValorComponent', () => {
  let component: FormDeclaracionValorComponent;
  let fixture: ComponentFixture<FormDeclaracionValorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDeclaracionValorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDeclaracionValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
