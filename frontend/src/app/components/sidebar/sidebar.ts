import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { UserService } from '../../models/user-service';

interface NavItem {
  route: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  @Input() mobileOpen = false;
  @Input() collapsed = false;
  @Output() toggleCollapse = new EventEmitter<void>();
  @Output() closeDrawer = new EventEmitter<void>();

  user: string = '';
  userId: number = 0;
  currentUrl = '';

  navItems: NavItem[] = [];

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.userName.subscribe(name => (this.user = name));
    this.userService.user$.subscribe(user => {
      this.userId = user?.id ?? 0;
      this.navItems = [
        { route: `/home/${this.userId}`, label: 'Home', icon: 'home' },
        { route: '/forum', label: 'Foro', icon: 'forum' },
        { route: '/activities', label: 'Actividades', icon: 'calendar' },
        { route: '/games', label: 'Juegos', icon: 'gamepad' },
      ];
    });

    this.currentUrl = this.router.url;
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) this.currentUrl = e.urlAfterRedirects;
    });
  }

  isActive(route: string): boolean {
    const base = route.split('/').slice(0, 2).join('/');
    return this.currentUrl.startsWith(base);
  }

  cerrarSesion() {
    this.userService.clearUser(); // limpia memoria y localStorage
    this.router.navigate(['/']);
  }
}
