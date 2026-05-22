import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Avatar } from '../avatar/avatar';
import { UserService } from '../../models/user-service';

@Component({
  selector: 'app-profile',
  imports: [Avatar],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  @Output() toggleProfile = new EventEmitter<void>();
  @Input() nombre: string="";

  puntosCuentaComponente = 0;
  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.userService.points$.subscribe(points => {
      this.puntosCuentaComponente = points;
      this.cdr.detectChanges();
    });
  }
}
