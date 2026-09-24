import { Component, Input } from '@angular/core';

function hue(n: string): number {
  let h = 0;
  for (const c of n) h = (h * 31 + c.charCodeAt(0)) % 360;
  return 8 + (h % 36);
}
function initials(n: string): string {
  return n
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('') || '?';
}

@Component({
  selector: 'app-avatar',
  imports: [],
  template: `
  <div
    class="avatar"
    [style.width.px]="size"
    [style.height.px]="size"
    [style.background]="'hsl(' + hue(name) + ' 62% 38%)'"
    [style.fontSize.px]="round(size * 0.38)"
    aria-hidden="true">
    {{ initials(name) }}
  </div>
  `,
  styles: `
    .avatar { transition: transform .15s ease; }
  `,
})
export class Avatar {
  @Input() size: number = 45;
  @Input() src: string = '';
  @Input() alt: string = 'Perfil de usuario';
  @Input() name: string = 'Estudiante';

  hue = hue;
  initials = initials;
  round = Math.round;
}
