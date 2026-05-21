import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BasePost } from '@models/base-post';

@Component({
  selector: 'app-feed-card',
  imports: [],
  templateUrl: './feed-card.html',
  styleUrl: './feed-card.css',
})
export class FeedCard extends BasePost {
  @Input() nombre: string = 'Sin Autor';
  @Input() title: string = 'Sin titulo';
  @Input() content: string = '...';
  @Input() costPoints: number = 0;
  @Input() activityId: number = 0;

  // Emite el id de la actividad al componente padre cuando el usuario pulsa "Entrar"
  @Output() onJoin = new EventEmitter<number>();

  unirse() {
    this.onJoin.emit(this.activityId);
  }
}