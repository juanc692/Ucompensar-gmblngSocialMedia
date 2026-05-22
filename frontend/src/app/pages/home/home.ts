import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FeedCard } from '../../components/feed-card/feed-card';
import { TopLeather } from '../../components/top-leather/top-leather';
import { PostsCard } from '../../components/posts-card/posts-card';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../models/user-service';
import { AuthService } from '../../services/auth.service';
import { ForumService, Thread } from '../../services/forum.service';
import { ActivityService, Activity } from '../../services/activity.service';

@Component({
  selector: 'app-home',
  imports: [FeedCard, PostsCard, TopLeather],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  userId: string | null = '';
  userName: string = '';

  ultimasActividades: Activity[] = [];
  ultimosThreads: Thread[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private forumService: ForumService,
    private activityService: ActivityService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');

    const savedUser = this.authService.getUser();
    if (savedUser) {
      this.userService.setUser(savedUser);
      this.userName = savedUser.name;
    }

    this.activityService.getActivities(1, 4).subscribe({
      next: (data) => { this.ultimasActividades = data; this.cdr.detectChanges(); },
      error: () => {}
    });

    this.forumService.getThreads(1, 4).subscribe({
      next: (data) => { this.ultimosThreads = data; this.cdr.detectChanges(); },
      error: () => {}
    });
  }
}