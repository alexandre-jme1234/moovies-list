import { Component } from '@angular/core';
import { AuthComponent } from "../auth/auth.component";

@Component({
    selector: 'app-edit-profil',
    standalone: true,
    templateUrl: './edit-profil.component.html',
    styleUrl: './edit-profil.component.scss',
    imports: [AuthComponent, AuthComponent]
})
export class EditProfilComponent {

}
