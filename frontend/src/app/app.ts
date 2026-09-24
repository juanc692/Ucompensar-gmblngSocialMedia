import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Navbar } from './components/navbar/navbar';
import { UserService } from './models/user-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('Círculo U');

  // Colapsa/expande la barra lateral en escritorio
  collapsed = signal(false);
  // Abre/cierra el menú como cajón en móvil
  mobileOpen = signal(false);
  // Muestra/oculta el popover de perfil en la barra superior
  visibleProfile = signal(false);

  toggleCollapse() {
    this.collapsed.update(v => !v);
  }

  toggleSidebar() {
    // En pantallas pequeñas actúa como cajón; en escritorio, como colapso.
    this.mobileOpen.update(v => !v);
  }

  closeSidebarDrawer() {
    this.mobileOpen.set(false);
  }

  toggleProfile() {
    this.visibleProfile.update(v => !v);
  }

  closeProfile() {
    this.visibleProfile.set(false);
  }

  // USER es la variable utilizada para asignar el nombre de usuario y guardarlo dentro del componente app
  user: string = '';
  // La barra lateral y la superior solo se muestran fuera del login
  showShell = signal(false);

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    // Nos suscribimos para que cada vez que el servicio emita un nuevo nombre,
    // la variable 'user' de este componente se actualice.
    this.userService.userName.subscribe(name => {
      this.user = name;
    });

    this.showShell.set(this.router.url !== '/');
    this.router.events.subscribe(() => {
      this.showShell.set(this.router.url !== '/');
      this.mobileOpen.set(false);
      this.visibleProfile.set(false);
    });
  }
}
