import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-posts-card',
  imports: [],
  templateUrl: './posts-card.html',
  styleUrl: './posts-card.css',
})
export class PostsCard {
  @Input() title: string= "Sin titulo..";
  @Input() content: string= "loreimpsun";
  @Input() URL: string="";
}
