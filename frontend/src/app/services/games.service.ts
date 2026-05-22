import { Injectable } from '@angular/core';

import { Observable } from 'rxjs'; //importante exportar el observable
import { HttpClient } from '@angular/common/http'; //ayuda a hacer el pedido


@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private apiURL = 'https://feeds.gamepix.com/v2/json?page=1&pagination=12&category=arcade';
  constructor( private http: HttpClient) { }

  public getGames(): Observable<any> {
    return this.http.get<any>(this.apiURL);
  }
}
