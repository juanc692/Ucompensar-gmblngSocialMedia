import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { GamePage } from './components/game-page/game-page';
import { Forum } from './components/forum/forum';
import { ActivityPage } from './components/activity-page/activity-page';
import { Login } from './components/login/login';

export const routes: Routes = [
    {path: '',component:Login},
    {path: 'home/:id',component:Home},
    {path: 'games',component:GamePage},
    {path: 'forum',component:Forum},
    {path: 'activities', component:ActivityPage}
];
