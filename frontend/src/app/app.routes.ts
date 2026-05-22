import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { GamePage } from './pages/game-page/game-page';
import { Forum } from './pages/forum/forum';
import { ActivityPage } from './pages/activity-page/activity-page';
import { Login } from './pages/login/login';
import { guestGuard, authGuard } from './guards/auth.guard-guard';
import { SnakeComponent } from './components/games/snake/snake';

export const routes: Routes = [
    { path: '', component: Login, canActivate: [guestGuard] },
    { path: 'home/:id', component: Home, canActivate: [authGuard] },
    { path: 'games', component: GamePage, canActivate: [authGuard] },
    { path: 'forum', component: Forum, canActivate: [authGuard] },
    { path: 'activities', component: ActivityPage, canActivate: [authGuard] },
    { path: 'games/snakeGame', component:SnakeComponent,canActivate:[authGuard]}
];