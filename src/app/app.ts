import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { Sidebar } from "./components/sidebar/sidebar";
import { FeedCard } from "./components/feed-card/feed-card";
import { Profile } from "./components/profile/profile";
import { GamePage } from './components/game-page/game-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Sidebar, FeedCard, Profile, GamePage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gamblingP');
}
