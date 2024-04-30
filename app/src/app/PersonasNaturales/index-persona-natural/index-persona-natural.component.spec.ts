import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPersonaNaturalComponent } from './index-persona-natural.component';

describe('IndexPersonaNaturalComponent', () => {
  let component: IndexPersonaNaturalComponent;
  let fixture: ComponentFixture<IndexPersonaNaturalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPersonaNaturalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPersonaNaturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
