import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../models/user-service';
@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  user: string = "";
      constructor(public userService: UserService) {} //este es un constructor tomando el archivo user-service.ts, el cual se utiliza para almacenar "globalmente" el dato de usuario
      //de esta manera, este componente puede obtener el nombre del usuario y utilizarlo en el componente profile
      ngOnInit() {
      this.userService.userName.subscribe(name => {
          this.user = name;
        });
      }
}
