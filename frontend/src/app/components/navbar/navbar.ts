import { Component, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { Avatar } from '../avatar/avatar';
import { UserService } from '../../models/user-service';

@Component({
  selector: 'app-navbar',
  imports: [Avatar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  puntosCuentaComponente = 0;

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleProfile = new EventEmitter<void>();

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.userService.points$.subscribe(points => {
      this.puntosCuentaComponente = points;
      this.cdr.detectChanges();
    });
  }
}