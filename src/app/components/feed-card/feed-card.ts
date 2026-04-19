import { Component, Input } from '@angular/core';
import {BasePost} from '@models/base-post';

@Component({
  selector: 'app-feed-card',
  imports: [],
  templateUrl: './feed-card.html',
  styleUrl: './feed-card.css',
})
export class FeedCard extends BasePost  {
  @Input() nombre: string="Sin Autor";
}
