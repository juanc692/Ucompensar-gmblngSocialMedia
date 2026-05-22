import { Component, signal } from '@angular/core';
import { GamesService } from '../../services/games.service';


@Component({
  selector: 'app-game-page',
  imports: [],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage {

  dataGames = signal<any[]>([]);//array donde iran los juegos
  constructor(private gamesService: GamesService){}
  
  ngOnInit(){
    this.gamesService.getGames().subscribe(dataGames => {
      if (dataGames && dataGames.items) { //verifica que el array no este vacio
        this.dataGames.set(dataGames.items);
      }
      
      console.log('Juegos cargados en el array:', this.dataGames);
      }
    );
  }


    visibleProfile = signal(false);
    visibleSideBar = signal(true);

    toggleProfile() {
      this.visibleProfile.update(v => !v);
    }

    toggleSidebar() {
      this.visibleSideBar.update(v => !v);
      console.log("Sidebar set to: ",this.visibleSideBar)
    }
}
