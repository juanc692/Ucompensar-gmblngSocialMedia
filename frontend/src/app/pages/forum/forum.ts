import { Component } from '@angular/core';
import { PostsCard } from '../../components/posts-card/posts-card';

@Component({
  selector: 'app-forum',
  imports: [PostsCard],
  templateUrl: './forum.html',
  styleUrl: './forum.css',
})
export class Forum {}
