import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal, NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent implements OnInit {
  constructor(private activeModal: NgbActiveModal) {}
  ngOnInit() {
  }
  closeModal() {
    this.activeModal.close('Modal Closed');
  }

}
