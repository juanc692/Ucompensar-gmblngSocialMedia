import { Component } from '@angular/core';
import { FeedCard } from '../feed-card/feed-card';

@Component({
  selector: 'app-activity-page',
  imports: [FeedCard],
  templateUrl: './activity-page.html',
  styleUrl: './activity-page.css',
})
export class ActivityPage {}
