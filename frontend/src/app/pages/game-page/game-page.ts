import { Component, ChangeDetectorRef } from '@angular/core';
import { UserHttpService } from '../../services/user-http.service';

interface Pregunta {
  enunciado: string;
  opciones: string[];
  correcta: number; // índice de la opción correcta
}

type EstadoJuego = 'menu' | 'jugando' | 'resultado';

const PREGUNTAS: Pregunta[] = [
  { enunciado: '¿Cuántos planetas hay en el sistema solar?', opciones: ['7', '8', '9', '10'], correcta: 1 },
  { enunciado: '¿En qué año llegó el hombre a la Luna?', opciones: ['1965', '1969', '1972', '1975'], correcta: 1 },
  { enunciado: '¿Cuál es el elemento más abundante en la corteza terrestre?', opciones: ['Hierro', 'Carbono', 'Oxígeno', 'Silicio'], correcta: 2 },
  { enunciado: '¿Quién escribió "Cien años de soledad"?', opciones: ['Mario Vargas Llosa', 'Jorge Luis Borges', 'Gabriel García Márquez', 'Julio Cortázar'], correcta: 2 },
  { enunciado: '¿Cuál es la capital de Australia?', opciones: ['Sídney', 'Melbourne', 'Brisbane', 'Canberra'], correcta: 3 },
  { enunciado: '¿Cuántos bits tiene un byte?', opciones: ['4', '8', '16', '32'], correcta: 1 },
  { enunciado: '¿Qué gas es el más abundante en la atmósfera terrestre?', opciones: ['Oxígeno', 'Dióxido de carbono', 'Nitrógeno', 'Argón'], correcta: 2 },
  { enunciado: '¿En qué país se inventó el papel?', opciones: ['Japón', 'Egipto', 'China', 'India'], correcta: 2 },
  { enunciado: '¿Cuál es el río más largo del mundo?', opciones: ['Amazonas', 'Nilo', 'Yangtsé', 'Misisipi'], correcta: 1 },
  { enunciado: '¿Cuántos lados tiene un hexágono?', opciones: ['5', '6', '7', '8'], correcta: 1 },
];

const PUNTOS_POR_CORRECTA = 10;
const TOTAL_PREGUNTAS = 5;

@Component({
  selector: 'app-game-page',
  imports: [],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage {

  estado: EstadoJuego = 'menu';

  preguntas: Pregunta[] = [];
  indiceActual = 0;
  puntajePartida = 0;
  seleccionada: number | null = null;
  respondida = false;
  guardando = false;

  constructor(private userHttpService: UserHttpService, private cdr: ChangeDetectorRef) {}

  iniciarTrivia() {
    // Mezcla y toma 5 preguntas al azar
    this.preguntas = [...PREGUNTAS]
      .sort(() => Math.random() - 0.5)
      .slice(0, TOTAL_PREGUNTAS);
    this.indiceActual = 0;
    this.puntajePartida = 0;
    this.seleccionada = null;
    this.respondida = false;
    this.estado = 'jugando';
    this.cdr.detectChanges();
  }

  responder(indice: number) {
    if (this.respondida) return;
    this.seleccionada = indice;
    this.respondida = true;

    if (indice === this.preguntas[this.indiceActual].correcta) {
      this.puntajePartida += PUNTOS_POR_CORRECTA;
    }
    this.cdr.detectChanges();
  }

  siguiente() {
    if (this.indiceActual < this.preguntas.length - 1) {
      this.indiceActual++;
      this.seleccionada = null;
      this.respondida = false;
    } else {
      this.terminar();
    }
    this.cdr.detectChanges();
  }

  terminar() {
    this.estado = 'resultado';
    if (this.puntajePartida > 0) {
      this.guardando = true;
      // awardPoints actualiza el backend, el estado en memoria y localStorage
      this.userHttpService.awardPoints(this.puntajePartida);
      this.guardando = false;
      this.cdr.detectChanges();
    }
  }

  get preguntaActual(): Pregunta {
    return this.preguntas[this.indiceActual];
  }

  esCorrecta(indice: number): boolean {
    return indice === this.preguntaActual.correcta;
  }

  claseOpcion(indice: number): string {
    if (!this.respondida) return 'btn btn-outline-secondary w-100 mb-2 text-start';
    if (indice === this.preguntaActual.correcta) return 'btn btn-success w-100 mb-2 text-start';
    if (indice === this.seleccionada) return 'btn btn-danger w-100 mb-2 text-start';
    return 'btn btn-outline-secondary w-100 mb-2 text-start';
  }
}