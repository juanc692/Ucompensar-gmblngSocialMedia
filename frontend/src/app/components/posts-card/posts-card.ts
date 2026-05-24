import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForumService, Comment } from '../../services/forum.service';

@Component({
  selector: 'app-posts-card',
  imports: [FormsModule],
  templateUrl: './posts-card.html',
  styleUrl: './posts-card.css',
})
export class PostsCard implements OnInit {
  @Input() threadId: number = 0;
  @Input() title: string = 'Sin titulo..';
  @Input() content: string = '';
  @Input() URL: string = '';
  @Input() category: string = '';
  @Input() createdAt: string = '';
  @Input() authorName: string = '';

  expandido = false;
  comentarios: Comment[] = [];
  cargandoComentarios = false;

  // Nuevo comentario raíz
  nuevoComentario = '';
  enviando = false;

  // Responder a un comentario específico
  respondiendo: number | null = null; // id del comentario al que se responde
  textoRespuesta = '';

  constructor(private forumService: ForumService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  toggleExpandir() {
    this.expandido = !this.expandido;
    if (this.expandido && this.comentarios.length === 0 && this.threadId) {
      this.cargarComentarios();
    }
  }

  cargarComentarios() {
    this.cargandoComentarios = true;
    this.forumService.getComments(this.threadId).subscribe({
      next: (data) => { this.comentarios = data; this.cargandoComentarios = false; this.cdr.detectChanges(); },
      error: () => { this.cargandoComentarios = false; this.cdr.detectChanges(); }
    });
  }

  comentar() {
    if (!this.nuevoComentario.trim()) return;
    this.enviando = true;
    this.forumService.createComment(this.threadId, this.nuevoComentario).subscribe({
      next: () => {
        this.nuevoComentario = '';
        this.enviando = false;
        this.cargarComentarios();
      },
      error: () => { this.enviando = false; this.cdr.detectChanges(); }
    });
  }

  responder(comentarioId: number) {
    this.respondiendo = comentarioId;
    this.textoRespuesta = '';
  }

  enviarRespuesta(comentarioId: number) {
    if (!this.textoRespuesta.trim()) return;
    this.forumService.createComment(this.threadId, this.textoRespuesta, comentarioId).subscribe({
      next: () => {
        this.respondiendo = null;
        this.textoRespuesta = '';
        this.cargarComentarios();
      },
      error: () => this.cdr.detectChanges()
    });
  }

  cancelarRespuesta() {
    this.respondiendo = null;
    this.textoRespuesta = '';
  }

  formatDate(date?: string): string {
    const d = date || this.createdAt;
    if (!d) return '';
    return new Date(d).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}