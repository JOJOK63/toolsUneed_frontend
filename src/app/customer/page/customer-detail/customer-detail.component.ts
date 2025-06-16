import {Component, OnInit} from '@angular/core';
import {Customer} from '../../model/Customer';
import {CustomerService} from '../../service/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent implements OnInit {
  customerDetail!: Customer;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const customerId = this.route.snapshot.params['id'];
    if (customerId) {
      this.customerService.customerDetails(customerId).subscribe({
        next: (customer) => {
          this.customerDetail = customer;
        },
        error: (err) => {
          console.error("Erreur lors de la récupération du customer:", err);
          alert("Erreur lors du chargement des détails du client");
        },
        complete: () => {
          console.log(`Customer ${this.customerDetail.id} détail récupéré !`);
        }
      });
    }
  }

  deleteCustomer(customerId: number | undefined) {
    if (!customerId) {
      alert("Erreur : ID client manquant");
      return;
    }

    if (confirm(`Êtes-vous sûr de vouloir supprimer ${this.customerDetail.lastname} ${this.customerDetail.firstname} ?`)) {
      this.customerService.deleteCustomer(customerId).subscribe({
        next: () => {
          alert(`Suppression du client ${customerId} réussie`);
          this.router.navigate(['/customer']);
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
          alert("Erreur lors de la suppression votre utilisateur est surement lié à d'autres données");
        }
      });
    }
  }
}
