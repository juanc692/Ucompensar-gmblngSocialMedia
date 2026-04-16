import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  template: `
  <div 
      class="avatar-wrapper shadow-sm border border-light" 
      [style.width.px]="size" 
      [style.height.px]="size">
      <img 
        [src]="src || 'https://via.placeholder.com/150'" 
        [alt]="alt"
        class="img-fluid rounded-circle">
    </div>
  `,
  styles: `
  .avatar-wrapper {
      display: inline-block;
      border-radius: 50%;
      overflow: hidden;
      background-color: #e9ecef;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .avatar-wrapper:hover {
      transform: scale(1.05);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
})
export class Avatar {
  @Input() size: number = 45;
  @Input() src: string = '';
  @Input() alt: string = 'Perfil de usuario'
}
