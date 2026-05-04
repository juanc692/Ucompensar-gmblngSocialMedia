import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { GamePage } from './components/game-page/game-page';
import { Forum } from './components/forum/forum';
import { ActivityPage } from './components/activity-page/activity-page';

export const routes: Routes = [
    {path: '',component:Home},
    {path: 'games',component:GamePage},
    {path: 'forum',component:Forum},
    {path: 'activities', component:ActivityPage}
];
