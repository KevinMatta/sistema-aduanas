import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormEstadosCivilesComponent } from "./form-estados-civiles.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("FormEstadosCivilesComponent", () => {
  let component: FormEstadosCivilesComponent;
  let fixture: ComponentFixture<FormEstadosCivilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormEstadosCivilesComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEstadosCivilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
