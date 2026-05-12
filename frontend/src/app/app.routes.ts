import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { GamePage } from './pages/game-page/game-page';
import { Forum } from './pages/forum/forum';
import { ActivityPage } from './pages/activity-page/activity-page';
import { Login } from './pages/login/login';

export const routes: Routes = [
    {path: '',component:Login},
    {path: 'home/:id',component:Home},
    {path: 'games',component:GamePage},
    {path: 'forum',component:Forum},
    {path: 'activities', component:ActivityPage}
];
