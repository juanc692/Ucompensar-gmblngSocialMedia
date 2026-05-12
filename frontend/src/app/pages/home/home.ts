import { Component, OnInit} from '@angular/core';
import { FeedCard } from '../../components/feed-card/feed-card';
import{TopLeather} from '../../components/top-leather/top-leather';
import { PostsCard } from '../../components/posts-card/posts-card';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../models/user-service';
@Component({
  selector: 'app-home',
  imports: [FeedCard, PostsCard, TopLeather],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  userId: string | null = '';

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.setUserName(this.userId);
    }
  }
  //al igual que en sidebar, se crea un constructor para poder acceder al dato guardado en user-service.ts que en este caso es user pero con la diferencia de que
  //esta vez se ASIGNA el valor al servicio, al utilizar la ruta dinamica para enviar el dato obtenido desde login, este llega al componente home, y ahi, llama a UserService
  //y le asigna el valor obtenido para que asi todos los componetnes que requieran acceder al nombre del usuario, accedan a user-service.ts directamente para obtenerlo
}
