import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormEmpleadosComponent } from "./form-empleados.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("FormContactoComponent", () => {
  let component: FormEmpleadosComponent;
  let fixture: ComponentFixture<FormEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormEmpleadosComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
