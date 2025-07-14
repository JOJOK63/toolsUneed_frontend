export interface FinancialTransaction {
  id?: number;
  name: string;
  detail: string;
  amount: number;
  type: string;
  createdAt: Date;
  budgetId: number;
}
