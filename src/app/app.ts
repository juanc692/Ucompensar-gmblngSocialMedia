import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Profile } from './components/profile/profile';
import { Sidebar } from './components/sidebar/sidebar';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Profile,Sidebar,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gamblingP');
    visibleProfile = signal(false);
    visibleSideBar = signal(false);

    toggleProfile() {
      this.visibleProfile.update(v => !v);
    }

    toggleSidebar() {
      this.visibleSideBar.update(v => !v);
      console.log("Sidebar set to: ",this.visibleSideBar)
    }

}
