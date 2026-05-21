import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedCard } from '../../components/feed-card/feed-card';
import { ActivityService, Activity } from '../../services/activity.service';

@Component({
  selector: 'app-activity-page',
  imports: [FeedCard, FormsModule],
  templateUrl: './activity-page.html',
  styleUrl: './activity-page.css',
})
export class ActivityPage implements OnInit {

  activities: Activity[] = [];
  cargando = false;
  error = '';

  // Estado del formulario "Crear actividad"
  mostrarFormulario = false;
  nuevoNombre = '';
  nuevaDescripcion = '';
  nuevoCosto = 0;
  enviando = false;

  // Búsqueda
  textoBusqueda = '';

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.cargarActividades();
  }

  cargarActividades() {
    this.cargando = true;
    this.error = '';
    this.activityService.getActivities().subscribe({
      next: (data) => { this.activities = data; this.cargando = false; },
      error: () => { this.error = 'No se pudieron cargar las actividades.'; this.cargando = false; }
    });
  }

  buscar() {
    if (!this.textoBusqueda.trim()) {
      this.cargarActividades();
      return;
    }
    this.cargando = true;
    this.activityService.searchActivity(this.textoBusqueda).subscribe({
      next: (data) => { this.activities = data; this.cargando = false; },
      error: () => { this.error = 'Error al buscar.'; this.cargando = false; }
    });
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.nuevoNombre = '';
    this.nuevaDescripcion = '';
    this.nuevoCosto = 0;
  }

  crearActividad() {
    if (!this.nuevoNombre.trim() || !this.nuevaDescripcion.trim()) return;
    this.enviando = true;
    this.activityService.createActivity({
      name_activity: this.nuevoNombre,
      description: this.nuevaDescripcion,
      cost_points: this.nuevoCosto
    }).subscribe({
      next: () => {
        this.enviando = false;
        this.mostrarFormulario = false;
        this.cargarActividades();
      },
      error: () => {
        this.enviando = false;
        this.error = 'Error al crear actividad. ¿Estás logueado?';
      }
    });
  }

  unirse(activityId: number) {
    this.activityService.joinActivity(activityId).subscribe({
      next: () => alert('¡Te uniste a la actividad!'),
      error: (err) => alert(err.error?.error || 'No se pudo unir a la actividad.')
    });
  }
}