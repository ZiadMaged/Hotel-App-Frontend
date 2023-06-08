import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CustomerItem } from '../models/customer-item';
import { ReservationItem } from '../models/reservation-item.model';
import { RoomItem } from '../models/room-item.model';
import { RoomTypeItem } from '../models/room-type-item.model';
import { ReservationsService } from '../services/reservations.service';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent {
  reservations: ReservationItem[] = [];
  customer: CustomerItem = new CustomerItem();

  constructor(private service: ReservationsService,
    private route: ActivatedRoute, private router: Router){
    this.refreshReservations();
  }
  

  ngOnInit(){
    this.route.paramMap
      .pipe(map(() => window.history.state)).subscribe(res=>{            
            this.customer = res;                                       
       })
  }

  refreshReservations(){
    let id: string = this.route.snapshot.paramMap.get('id') || "";     
    this.service.getCustomerReservations(id).subscribe((value) => {
      this.reservations = value;
    })
  }

  onDelete(id: string) {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.deleteReservation(id)
      .subscribe( res => {
        this.refreshReservations();
      },
      err => {
        console.log(err);
      })
    }
  }
  // onSubmit(form: NgForm) {
  //   console.table(this.reservation)
  //   if (!this.reservation.id) {
  //     this.insertRecord(this.reservation);
  //   } 
  //   else
  //     this.updateRecord(this.reservation); 
      
  //   this.resetForm(form);
  // }

  // insertRecord(reservation: ReservationItem){
  //   this.service.createReservation(reservation).subscribe();
  // }

  // updateRecord(reservation: ReservationItem){    
  //   this.service.updateReservation(reservation).subscribe();      
  // }

  // resetForm(form: NgForm){
  //   form.form.reset();
  //   this.reservation = new ReservationItem();
  //   this.reservationEvent.emit();
  //   this.router.navigate(['/reservations']);
  // }
}
