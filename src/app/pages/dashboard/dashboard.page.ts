import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrbitShellComponent } from '../../components/shell/shell.component';

interface UpcomingAppointment {
  id: string;
  patientName: string;
  time: string;
  type: 'Online' | 'Presencial';
  status: 'Em andamento' | 'Confirmado';
  avatarColor: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IonicModule, OrbitShellComponent],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  professionalName = 'Sávio';

  // TODO: substituir por dados reais da API (agregações do backend)
  stats = {
    consultasHoje: 5,
    consultasConcluidas: 3,
    pacientesAtivos: 28,
    pacientesNovos: 2,
    faturamentoMes: 4890,
    faturamentoVariacao: 12,
    sessoesMes: 42,
    sessoesVariacao: 8,
  };

  financeiro = {
    recebido: 4890,
    pendente: 1250,
    cancelado: 320,
  };

  get financeiroTotal(): number {
    return this.financeiro.recebido + this.financeiro.pendente + this.financeiro.cancelado;
  }

  get donutStyle(): { [key: string]: string } {
    const total = this.financeiroTotal;
    const recebidoPct = (this.financeiro.recebido / total) * 100;
    const pendentePct = (this.financeiro.pendente / total) * 100;
    return {
      background: `conic-gradient(
        var(--orb-green) 0% ${recebidoPct}%,
        var(--orb-amber) ${recebidoPct}% ${recebidoPct + pendentePct}%,
        var(--orb-red) ${recebidoPct + pendentePct}% 100%
      )`,
    };
  }

  appointments: UpcomingAppointment[] = [
    { id: '1', patientName: 'Amanda Silva', time: '09:00', type: 'Online', status: 'Em andamento', avatarColor: '#e786c9' },
    { id: '2', patientName: 'Carlos Eduardo', time: '10:30', type: 'Presencial', status: 'Confirmado', avatarColor: '#38bdf8' },
    { id: '3', patientName: 'Beatriz Lima', time: '14:00', type: 'Online', status: 'Confirmado', avatarColor: '#f2c879' },
    { id: '4', patientName: 'Lucas Pereira', time: '15:30', type: 'Presencial', status: 'Confirmado', avatarColor: '#4ade80' },
    { id: '5', patientName: 'Juliana Martins', time: '17:00', type: 'Online', status: 'Confirmado', avatarColor: '#6c5ce7' },
  ];
}
