import { Component} from '@angular/core';
import { FormUsuariosComponent } from './components/form-usuarios/form-usuarios.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // constructor(public modalService: NgbModal) { }
  // openModal() {
  //   //ModalComponent is component name where modal is declare
  //   const modalRef = this.modalService.open(FormUsuariosComponent);
  //   modalRef.result.then((result) => {
  //     console.log(result);
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }
  // ngOnInit(): void {
  // }
}
