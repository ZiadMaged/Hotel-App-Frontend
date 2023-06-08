import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CustomerItem } from '../models/customer-item';
import { ReservationItem } from '../models/reservation-item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  url: string = "http://localhost:5000/api/";
  constructor(private http: HttpClient) { }

  getReservations():  Observable<ReservationItem[]> {
    return this.http.get<ReservationItem[]>(this.url + "reservations/");  
  }

  getReservationById(id: string):  Observable<ReservationItem> {
    let actionUrl = this.url +'reservations/'+ id;
    return this.http.get<ReservationItem>(actionUrl);  
  }
  
  getCustomerReservations(id: string): Observable<ReservationItem[]>{
    return this.http.get<ReservationItem[]>(this.url + "customers/" + id + "/reservations/");  
  }

  createReservation(reservation: ReservationItem): Observable<ReservationItem>{
    let {id, ...reservationObj} = reservation;
    return this.http.post<ReservationItem>(this.url + "reservations/", reservationObj, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    });
  }

  updateReservation(reservation: ReservationItem): Observable<ReservationItem>{
    let {id, ...reservationObj} = reservation;
    return this.http.put<ReservationItem>(this.url + "reservations/" + id, reservationObj, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    });
  }
  
  deleteReservation(id: string): Observable<ReservationItem>{
    return this.http.delete<ReservationItem>(this.url + "reservations/" + id);
  }
  
}
