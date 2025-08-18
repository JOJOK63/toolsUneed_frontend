import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Transaction} from '../../../model/Transaction';
import {TransactionService} from '../../../service/transaction.service';

@Component({
  selector: 'app-transaction-list',
  imports: [],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent implements  OnInit,OnChanges{
  @Input() selectedBudgetId: number | null = null
  transactionData: Transaction[] = [];

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit() {
      this.transactionService.getAllTransactions().subscribe((data: any) => {
        this.transactionData = data;
        console.log(data);
      })
    }

  ngOnChanges(changes: SimpleChanges) {
  }

  editTransaction() {
    console.log("edit");
  }

  deleteTransaction(transactionId: any) {
    const transaction = this.transactionData.find(t => t.id === transactionId);

    if (!transaction) {
      alert("Transaction non trouvée");
      return;
    }

    if (confirm(`Êtes-vous sûr de vouloir supprimer ${transaction.name} ?`)) {
      this.transactionService.deleteTransaction(transactionId).subscribe({
        next: () => {
          alert(`Suppression de la transaction réussie`);
          // Retirer de la liste locale
          this.transactionData = this.transactionData.filter(t => t.id !== transactionId);
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
          alert("Erreur lors de la suppression");
        }
      });
    }
  }
}
