import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexListaComponent } from './index-lista.component';
// import { Usuario } from 'src/app/Models/UsuariosViewModel';

describe('IndexListaComponent', () => {
  let component: IndexListaComponent;
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
