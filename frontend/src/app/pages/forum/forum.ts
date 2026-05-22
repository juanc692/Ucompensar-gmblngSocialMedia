import { Component, OnInit } from '@angular/core';
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

  // Estado del formulario "Escribir post"
  mostrarFormulario = false;
  nuevoTitulo = '';
  nuevoContenido = '';
  nuevaCategoria = 'Discusión';
  enviando = false;

  // Búsqueda
  textoBusqueda = '';
  categoriaFiltro = '';

  constructor(
    private forumService: ForumService,
    private userService: UserService
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
      },
      error: () => {
        this.error = 'No se pudieron cargar los posts.';
        this.cargando = false;
      }
    });
  }

  buscar() {
    if (!this.textoBusqueda.trim()) {
      this.cargarThreads();
      return;
    }
    this.cargando = true;
    this.forumService.searchThreads(this.textoBusqueda).subscribe({
      next: (data) => { this.threads = data; this.cargando = false; },
      error: () => { this.error = 'Error al buscar.'; this.cargando = false; }
    });
  }

  filtrarPorCategoria(categoria: string) {
    this.categoriaFiltro = categoria;
    if (!categoria || categoria === 'Todos') {
      this.cargarThreads();
      return;
    }
    this.cargando = true;
    this.forumService.getThreadsByCategory(categoria).subscribe({
      next: (data) => { this.threads = data; this.cargando = false; },
      error: () => { this.error = 'Error al filtrar.'; this.cargando = false; }
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
        this.cargarThreads(); // recarga la lista con el nuevo post
      },
      error: () => {
        this.enviando = false;
        this.error = 'Error al publicar. ¿Estás logueado?';
      }
    });
  }
}