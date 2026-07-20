import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrbitShellComponent } from '../../components/shell/shell.component';

interface AgendaEvent {
  day: number; // 0=Seg ... 4=Sex
  startHour: number;
  endHour: number;
  patientName: string;
  type: 'Online' | 'Presencial' | 'Bloqueado';
  color: string;
}

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, IonicModule, OrbitShellComponent],
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage {
  hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  days = ['Seg 7', 'Ter 8', 'Qua 9', 'Qui 10', 'Sex 11'];

  // TODO: substituir por eventos reais da API (agenda do profissional)
  events: AgendaEvent[] = [
    { day: 0, startHour: 9, endHour: 10, patientName: 'Amanda Silva', type: 'Online', color: '#6c5ce7' },
    { day: 0, startHour: 10, endHour: 11, patientName: 'Bloqueado', type: 'Bloqueado', color: '#c4c6d8' },
    { day: 1, startHour: 10, endHour: 11, patientName: 'Carlos Eduardo', type: 'Presencial', color: '#38bdf8' },
    { day: 2, startHour: 14, endHour: 15, patientName: 'Beatriz Lima', type: 'Online', color: '#f2c879' },
    { day: 3, startHour: 15, endHour: 16, patientName: 'Lucas Pereira', type: 'Presencial', color: '#4ade80' },
    { day: 4, startHour: 17, endHour: 18, patientName: 'Juliana Martins', type: 'Online', color: '#6c5ce7' },
  ];

  eventStyle(e: AgendaEvent) {
    const top = (e.startHour - this.hours[0]) * 56;
    const height = (e.endHour - e.startHour) * 56 - 4;
    return {
      top: `${top}px`,
      height: `${height}px`,
      background: e.color + '22',
      borderLeft: `3px solid ${e.color}`,
    };
  }

  eventsForDay(dayIndex: number): AgendaEvent[] {
    return this.events.filter(e => e.day === dayIndex);
  }
}
