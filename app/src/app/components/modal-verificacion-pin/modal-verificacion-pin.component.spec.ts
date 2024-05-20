import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ModalVerificacionPINComponent } from "./modal-verificacion-pin.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("ModalPdfComponent", () => {
  let component: ModalVerificacionPINComponent;
  let fixture: ComponentFixture<ModalVerificacionPINComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalVerificacionPINComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerificacionPINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
