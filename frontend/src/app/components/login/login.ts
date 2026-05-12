import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private router: Router) {}

  entrar(id: string) {
    if (id) {
      this.router.navigate(['/home', id]);
    }
  }
  /*
  Aqui se utiliza un tipo de enrutamiento llamado navegacion programatica, utilizando una ruta dinamica
  una ruta dinamica es aquella que permite cambiar de ruta y enviar argumentos/datos consigo.
  Una navegacion programatica es aquella que permite cambiar de ruta dinámicamente desde el código TypeScript.
  */
}
