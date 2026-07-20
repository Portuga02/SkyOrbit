import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrbitShellComponent } from '../../components/shell/shell.component';

interface Transaction {
  id: string;
  patientName: string;
  date: string;
  amount: number;
  status: 'Pago' | 'Pendente' | 'Cancelado';
}

@Component({
  selector: 'app-financeiro',
  standalone: true,
  imports: [CommonModule, IonicModule, OrbitShellComponent],
  templateUrl: './financeiro.page.html',
  styleUrls: ['./financeiro.page.scss'],
})
export class FinanceiroPage {
  // TODO: substituir por dados reais da API financeira
  summary = { recebido: 4890, pendente: 1250, cancelado: 320 };

  transactions: Transaction[] = [
    { id: '1', patientName: 'Amanda Silva', date: '08/07/2025', amount: 180, status: 'Pago' },
    { id: '2', patientName: 'Carlos Eduardo', date: '05/07/2025', amount: 180, status: 'Pago' },
    { id: '3', patientName: 'Beatriz Lima', date: '01/07/2025', amount: 200, status: 'Pendente' },
    { id: '4', patientName: 'Lucas Pereira', date: '28/06/2025', amount: 180, status: 'Pago' },
    { id: '5', patientName: 'Juliana Martins', date: '24/06/2025', amount: 320, status: 'Cancelado' },
  ];
}
