import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostsCard } from '../../components/posts-card/posts-card';
import { ForumService, Thread } from '../../services/forum.service';
import { UserService } from '../../models/user-service';

@Component({
  selector: 'app-forum',
  imports: [PostsCard, FormsModule],
  templateUrl: './forum.html',
  styleUrl: './forum.css',
})
export class Forum implements OnInit {

  threads: Thread[] = [];
  cargando = false;
  error = '';

  mostrarFormulario = false;
  nuevoTitulo = '';
  nuevoContenido = '';
  nuevaCategoria = 'Discusión';
  enviando = false;

  textoBusqueda = '';
  categoriaFiltro = '';

  constructor(
    private forumService: ForumService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarThreads();
  }

  cargarThreads() {
    this.cargando = true;
    this.error = '';
    this.forumService.getThreads().subscribe({
      next: (data) => {
        this.threads = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudieron cargar los posts.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  buscar() {
    if (!this.textoBusqueda.trim()) { this.cargarThreads(); return; }
    this.cargando = true;
    this.forumService.searchThreads(this.textoBusqueda).subscribe({
      next: (data) => { this.threads = data; this.cargando = false; this.cdr.detectChanges(); },
      error: () => { this.error = 'Error al buscar.'; this.cargando = false; this.cdr.detectChanges(); }
    });
  }

  filtrarPorCategoria(categoria: string) {
    this.categoriaFiltro = categoria;
    if (!categoria || categoria === 'Todos') { this.cargarThreads(); return; }
    this.cargando = true;
    this.forumService.getThreadsByCategory(categoria).subscribe({
      next: (data) => { this.threads = data; this.cargando = false; this.cdr.detectChanges(); },
      error: () => { this.error = 'Error al filtrar.'; this.cargando = false; this.cdr.detectChanges(); }
    });
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.nuevoTitulo = '';
    this.nuevoContenido = '';
  }

  publicar() {
    if (!this.nuevoTitulo.trim() || !this.nuevoContenido.trim()) return;
    this.enviando = true;
    this.forumService.createThread({
      category: this.nuevaCategoria,
      title: this.nuevoTitulo,
      body: this.nuevoContenido
    }).subscribe({
      next: () => {
        this.enviando = false;
        this.mostrarFormulario = false;
        this.cdr.detectChanges();
        this.cargarThreads();
      },
      error: () => {
        this.enviando = false;
        this.error = 'Error al publicar. ¿Estás logueado?';
        this.cdr.detectChanges();
      }
    });
  }
}