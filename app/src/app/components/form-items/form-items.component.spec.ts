import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormItemsComponent } from "./form-items.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("FormContactoComponent", () => {
  let component: FormItemsComponent;
  let fixture: ComponentFixture<FormItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormItemsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
