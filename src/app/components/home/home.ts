import { Component, signal } from '@angular/core';
// import { Navbar } from "../navbar/navbar";
// import { Sidebar } from "../sidebar/sidebar";
// import { Profile } from "../profile/profile";
import { FeedCard } from "../feed-card/feed-card";
import {TopLeather} from "../top-leather/top-leather";
import { PostsCard } from '../posts-card/posts-card';
@Component({
  selector: 'app-home',
  imports: [FeedCard, PostsCard, TopLeather],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
    // visibleProfile = signal(false);
    // visibleSideBar = signal(true);

    // toggleProfile() {
    //   this.visibleProfile.update(v => !v);
    // }

    // toggleSidebar() {
    //   this.visibleSideBar.update(v => !v);
    //   console.log("Sidebar set to: ",this.visibleSideBar)
    //}
}
