import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormCiudadesComponent } from "./form-ciudades.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("FormCiudadesComponent", () => {
  let component: FormCiudadesComponent;
  let fixture: ComponentFixture<FormCiudadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCiudadesComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCiudadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
