import { Component, Output, EventEmitter } from '@angular/core';
import { Avatar } from '../avatar/avatar';

@Component({
  selector: 'app-navbar',
  imports: [Avatar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  puntosCuentaComponente = 99998;

    @Output() toggleSidebar = new EventEmitter<void>();
    @Output() toggleProfile = new EventEmitter<void>();
}
