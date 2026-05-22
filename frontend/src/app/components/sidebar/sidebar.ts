import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../models/user-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {

  user: string = '';
  userId: number = 0;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.userName.subscribe(name => this.user = name);
    this.userService.user$.subscribe(user => {
      if (user) this.userId = user.id;
    });
  }

  cerrarSesion() {
    this.userService.clearUser(); // limpia memoria y localStorage
    this.router.navigate(['/']);
  }
}