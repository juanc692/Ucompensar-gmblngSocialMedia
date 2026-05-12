import { Component, signal, OnInit} from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { Profile } from './components/profile/profile';
import { Sidebar } from './components/sidebar/sidebar';
import { Navbar } from './components/navbar/navbar';
import { UserService } from './models/user-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Profile,Sidebar,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('gamblingP');
    visibleProfile = signal(false);
    visibleSideBar = signal(false);

    toggleProfile() {
      this.visibleProfile.update(v => !v);
    }

    toggleSidebar() {
      this.visibleSideBar.update(v => !v);
      console.log("Sidebar set to: ",this.visibleSideBar)
    }

    //USER es la variable utilizada para asignar el nombre de usuario y guardarlo dentro del componente app
    user: string = "";
    constructor(public userService: UserService) {}

    ngOnInit() {
    // Nos suscribimos para que cada vez que el servicio emita un nuevo nombre, 
    // la variable 'user' de este componente se actualice.
    this.userService.userName.subscribe(name => {
        this.user = name;
      });
    }

}
