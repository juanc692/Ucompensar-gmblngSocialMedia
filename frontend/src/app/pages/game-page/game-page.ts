import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-game-page',
  imports: [],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage {
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
