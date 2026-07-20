import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrbitShellComponent } from '../../components/shell/shell.component';

interface ReportType {
  id: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, OrbitShellComponent],
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage {
  selectedPatient = '';
  startDate = '';
  endDate = '';
  generating: string | null = null;

  reportTypes: ReportType[] = [
    { id: 'declaracao', title: 'Declaração de comparecimento', description: 'Documento simples confirmando presença, sem detalhes clínicos', icon: 'document-text-outline' },
    { id: 'relatorio', title: 'Relatório psicológico', description: 'Documento completo com evolução e conclusão técnica', icon: 'clipboard-outline' },
    { id: 'financeiro', title: 'Relatório financeiro', description: 'Resumo de recebimentos e pendências por período', icon: 'cash-outline' },
    { id: 'sessoes', title: 'Frequência de sessões', description: 'Histórico de sessões realizadas, canceladas e faltas', icon: 'calendar-outline' },
  ];

  // TODO: substituir por lista real de pacientes vinda da API
  patients = ['Amanda Silva', 'Carlos Eduardo', 'Beatriz Lima', 'Lucas Pereira', 'Juliana Martins'];

  // TODO: chamar endpoint real de geração de PDF (respeitando as regras do CFP por tipo de documento)
  generate(reportId: string) {
    this.generating = reportId;
    setTimeout(() => {
      this.generating = null;
    }, 1200);
  }
}
