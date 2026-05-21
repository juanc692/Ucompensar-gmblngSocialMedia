import { Component, OnInit } from '@angular/core';
import { FeedCard } from '../../components/feed-card/feed-card';
import { TopLeather } from '../../components/top-leather/top-leather';
import { PostsCard } from '../../components/posts-card/posts-card';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../models/user-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [FeedCard, PostsCard, TopLeather],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  userId: string | null = '';

  constructor(private route: ActivatedRoute,private userService: UserService,private authService: AuthService ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');

    // Intenta restaurar el usuario completo desde localStorage
    const savedUser = this.authService.getUser();
    if (savedUser) {
      this.userService.setUser(savedUser);
    } else if (this.userId) {
      // Fallback: si por algún motivo no hay datos, al menos muestra el id en la navbar
      this.userService.setUserName(this.userId);
    }
  }
}