import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormCategoriasComponent } from "./form-categorias.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("FormEstadosComponent", () => {
  let component: FormCategoriasComponent;
  let fixture: ComponentFixture<FormCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCategoriasComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
