import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Avatar } from '../avatar/avatar';

interface TopUser {
  id: number;
  name: string;
  points: number;
}

@Component({
  selector: 'app-top-leather',
  imports: [Avatar],
  templateUrl: './top-leather.html',
  styleUrl: './top-leather.css',
})
export class TopLeather implements OnInit {
  topUsers: TopUser[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get<TopUser[]>('http://localhost:3000/api/users/top').subscribe({
      next: (data) => { this.topUsers = data; this.cdr.detectChanges(); },
      error: () => this.topUsers = []
    });
  }
}
