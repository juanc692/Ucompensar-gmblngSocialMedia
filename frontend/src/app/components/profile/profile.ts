import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Avatar } from '../avatar/avatar';
import { UserService } from '../../models/user-service';

@Component({
  selector: 'app-profile',
  imports: [Avatar],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  @Output() toggleProfile = new EventEmitter<void>();
  @Input() nombre: string = '';

  puntosCuentaComponente = 0;
  email = '';
  isDark = true;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.points$.subscribe(points => {
      this.puntosCuentaComponente = points;
      this.cdr.detectChanges();
    });
    this.userService.user$.subscribe(user => {
      this.email = user?.email ?? '';
      this.cdr.detectChanges();
    });
    try {
      this.isDark = localStorage.getItem('cu-theme') !== 'light';
    } catch {
      this.isDark = true;
    }
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    const theme = this.isDark ? 'dark' : 'light';
    if (this.isDark) {
      delete document.documentElement.dataset['theme'];
    } else {
      document.documentElement.dataset['theme'] = 'light';
    }
    try {
      localStorage.setItem('cu-theme', theme);
    } catch {
      /* almacenamiento no disponible */
    }
  }

  cerrarSesion() {
    this.userService.clearUser();
    this.toggleProfile.emit();
    this.router.navigate(['/']);
  }
}
