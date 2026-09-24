import { Component, Output, EventEmitter, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Avatar } from '../avatar/avatar';
import { Profile } from '../profile/profile';
import { UserService } from '../../models/user-service';

@Component({
  selector: 'app-navbar',
  imports: [Avatar, Profile],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  puntosCuentaComponente = 0;
  nombreUsuario = 'Estudiante';

  @Input() profileOpen = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleProfile = new EventEmitter<void>();

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.userService.points$.subscribe(points => {
      this.puntosCuentaComponente = points;
      this.cdr.detectChanges();
    });
    this.userService.userName.subscribe(name => {
      this.nombreUsuario = name;
      this.cdr.detectChanges();
    });
  }

  get firstName(): string {
    return this.nombreUsuario.split(' ')[0] || this.nombreUsuario;
  }
}
