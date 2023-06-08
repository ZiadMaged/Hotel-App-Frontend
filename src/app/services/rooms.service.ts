import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ReservationItem } from '../models/reservation-item.model';
import { Observable } from 'rxjs';
import { RoomItem } from '../models/room-item.model';
import { RoomTypeItem } from '../models/room-type-item.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  url: string = "http://localhost:5000/api/";
  constructor(private http: HttpClient) { }

  getRooms():  Observable<RoomItem[]> {
    return this.http.get<RoomItem[]>(this.url + "rooms");  
  }

  getRoomTypes():  Observable<RoomTypeItem[]> {
    return this.http.get<RoomTypeItem[]>(this.url + "rooms/types/");  
  }

}
