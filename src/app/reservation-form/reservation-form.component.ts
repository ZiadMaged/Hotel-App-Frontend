import { Component, EventEmitter, Output } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationItem } from '../models/reservation-item.model';
import { CustomerItem } from '../models/customer-item';
import { map } from 'rxjs';
import { ReservationsService } from '../services/reservations.service';
import { RoomItem } from '../models/room-item.model';
import { RoomTypeItem } from '../models/room-type-item.model';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
  reservation: ReservationItem = new ReservationItem();
  customer: CustomerItem = new CustomerItem();
  rooms: RoomItem[] =[];
  roomTypes: RoomTypeItem[] =[];
  @Output() reservationEvent = new EventEmitter();
  id: string | null = ""; 
  subId: string | null = ""; 


  constructor(private service: ReservationsService, 
    private roomService: RoomsService, 
    private route: ActivatedRoute, private router: Router){
      this.refreshReservations();
      this.getRooms()

  }

  getRooms() {
    this.roomService.getRooms().subscribe((value) => {
      this.rooms = value;
    })  
    this.roomService.getRoomTypes().subscribe((value) => {
      this.roomTypes = value;
    })  
  }

  ngOnInit(){
    this.route.paramMap
      .pipe(map(() => window.history.state)).subscribe(res=>{            
            this.customer = res;                                       
       })
  }

  refreshReservations() {
    this.id = this.route.snapshot.paramMap.get('id');  
    this.subId = this.route.snapshot.paramMap.get('subId');  
    if(this.subId)
      this.service.getReservationById(this.subId)
        .subscribe(res => {          
          this.reservation = res;
          this.reservation.reservationDate = this.reservation.reservationDate.split('T')[0]                    
        })
  }

  onSubmit(form: NgForm) {
    if (!this.reservation.id) {
      let reserve = {...form.value, "customerId":this.id};
      this.insertRecord(reserve, form);
    } 
    else
      this.updateRecord(this.reservation, form); 
  }

  insertRecord(reservation: ReservationItem, form: NgForm){
    this.service.createReservation(reservation).subscribe(_ => this.resetForm(form));
  }

  updateRecord(reservation: ReservationItem, form: NgForm){    
    this.service.updateReservation(reservation).subscribe(_ => this.resetForm(form));      
  }

  resetForm(form: NgForm){
    form.form.reset();
    this.reservation = new ReservationItem();
    this.reservationEvent.emit();
    this.router.navigate([`/customers/${this.id}/reservations`]);
  }

  getRoomType(typeId: number){
    return this.roomTypes?.find(a => a.id == typeId)?.roomType || typeId
  }
}
