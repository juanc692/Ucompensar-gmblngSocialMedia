import { Component, Output, EventEmitter } from '@angular/core';
import { Avatar } from '../avatar/avatar';

@Component({
  selector: 'app-profile',
  imports: [Avatar],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  @Output() toggleProfile = new EventEmitter<void>();
}
