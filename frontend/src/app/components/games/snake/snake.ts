import { Component, ElementRef, HostListener, OnInit, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { UserHttpService } from '../../../services/user-http.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="game-container">
      <h3>Puntuación Actual: {{ score }}</h3>
      <canvas #gameCanvas width="400" height="400"></canvas>
      @if (gameOver) {
        <button class="btn btn-bd-primary" (click)="resetGame()">Reintentar</button>
        <button class="btn btn-bd-primary" (click)="saveAndExit()">Guardar y Salir</button>
      }
    </div>
  `,
  styles: [`
    .game-container { text-align: center; font-family: sans-serif; }
    canvas { border: 4px solid #333; background-color: #000; display: block; margin: 10px auto; }
    button { padding: 10px 20px; font-size: 16px; cursor: pointer; }
  `]
})
export class SnakeComponent implements OnInit {
  @ViewChild('gameCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Output() gameFinished = new EventEmitter<number>();

  private ctx!: CanvasRenderingContext2D;
  private snake = [{ x: 10, y: 10 }];
  private food = { x: 5, y: 5 };
  private dx = 1;
  private dy = 0;
  private gridSize = 20;
  private tileCount = 20;
  private gameInterval: any;

  score = 0;
  gameOver = false;

  constructor(
    private router: Router,
    private userHttpService: UserHttpService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.resetGame();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':    if (this.dy === 0) { this.dx = 0; this.dy = -1; } break;
      case 'ArrowDown':  if (this.dy === 0) { this.dx = 0; this.dy = 1; } break;
      case 'ArrowLeft':  if (this.dx === 0) { this.dx = -1; this.dy = 0; } break;
      case 'ArrowRight': if (this.dx === 0) { this.dx = 1; this.dy = 0; } break;
    }
  }

  resetGame() {
    this.snake = [{ x: 10, y: 10 }];
    this.generateFood();
    this.dx = 1;
    this.dy = 0;
    this.score = 0;
    this.gameOver = false;
    clearInterval(this.gameInterval);
    this.gameInterval = setInterval(() => this.updateGame(), 150);
  }

  saveAndExit() {
    if (this.score > 0) {
      // Solo llama al backend si se ganaron puntos
      this.userHttpService.awardPoints(this.score);
    }
    this.router.navigate(['/games']);
    this.cdr.detectChanges();
  }

  private updateGame() {
    if (this.gameOver) return;

    const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };

    if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount || this.checkSelfCollision(head)) {
      this.gameOver = true;
      clearInterval(this.gameInterval);
      this.gameFinished.emit(this.score);
      return;
    }

    this.snake.unshift(head);

    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.generateFood();
    } else {
      this.snake.pop();
    }

    this.draw();
  }

  private checkSelfCollision(head: { x: number, y: number }) {
    return this.snake.some(segment => segment.x === head.x && segment.y === head.y);
  }

  private generateFood() {
    this.food = {
      x: Math.floor(Math.random() * this.tileCount),
      y: Math.floor(Math.random() * this.tileCount)
    };
  }

  private draw() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, 400, 400);

    this.ctx.fillStyle = '#4CAF50';
    this.snake.forEach(segment => {
      this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
    });

    this.ctx.fillStyle = '#FF5722';
    this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
  }
}