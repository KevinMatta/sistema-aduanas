import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPersonaNaturalComponent } from './pdf-persona-natural.component';

describe('PdfPersonaNaturalComponent', () => {
  let component: PdfPersonaNaturalComponent;
  let fixture: ComponentFixture<PdfPersonaNaturalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfPersonaNaturalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfPersonaNaturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
