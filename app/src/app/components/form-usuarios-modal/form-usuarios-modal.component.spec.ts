import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormUsuariosModalComponent } from "./form-usuarios-modal.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("FormUsuariosModalComponent", () => {
  let component: FormUsuariosModalComponent;
  let fixture: ComponentFixture<FormUsuariosModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormUsuariosModalComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUsuariosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
