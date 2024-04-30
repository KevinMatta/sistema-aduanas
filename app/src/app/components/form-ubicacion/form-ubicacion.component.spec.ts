import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUbicacionComponent } from './form-ubicacion.component';

describe('FormUbicacionComponent', () => {
  let component: FormUbicacionComponent;
  let fixture: ComponentFixture<FormUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
