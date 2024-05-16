import { Component} from '@angular/core';
import { FormUsuariosComponent } from './components/form-usuarios/form-usuarios.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from './Models/UsuariosViewModel';
import { AuthenticationService } from './Services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Usuario;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }

    get isAdmin() {
        return this.user && this.user.Rol === 'Admin';
    }

    logout() {
        this.authenticationService.logout();
    }
}
