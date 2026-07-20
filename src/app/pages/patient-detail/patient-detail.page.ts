import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { OrbitShellComponent } from '../../components/shell/shell.component';

interface EvolutionEntry {
  id: string;
  date: string;
  type: 'Online' | 'Presencial';
  summary: string;
  plan: string;
}

type Tab = 'resumo' | 'prontuario' | 'sessoes' | 'financeiro';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [CommonModule, IonicModule, OrbitShellComponent],
  templateUrl: './patient-detail.page.html',
  styleUrls: ['./patient-detail.page.scss'],
})
export class PatientDetailPage implements OnInit {
  activeTab: Tab = 'resumo';

  // TODO: carregar dados reais do paciente pelo id da rota (API)
  patient = {
    name: 'Amanda Silva',
    age: 28,
    birthDate: '14/05/1997',
    phone: '(81) 99999-1234',
    email: 'amanda.silva@email.com',
    insurance: 'Não possui',
    professional: 'Sávio Gomes',
    lastSession: '08/07/2025 - 09:00 · Consulta Online',
  };

  // TODO: histórico real de evolução vindo do prontuário (dado sensível — exige LGPD/CFP)
  evolutions: EvolutionEntry[] = [
    {
      id: '1', date: '08/07/2025 - 09:00', type: 'Online',
      summary: 'Paciente relatou melhora significativa na ansiedade em situações sociais.',
      plan: 'Discutimos estratégias de enfrentamento e exposição gradual. Plano: continuar exercícios e registrar situações.',
    },
    {
      id: '2', date: '01/07/2025 - 09:00', type: 'Presencial',
      summary: 'Paciente apresentou preocupação com cobranças no trabalho.',
      plan: 'Exploramos pensamentos automáticos e reestruturação cognitiva. Plano: prática de mindfulness diária.',
    },
    {
      id: '3', date: '24/06/2025 - 09:00', type: 'Online',
      summary: 'Sessão de acolhimento e escuta inicial.',
      plan: 'Queixa principal: ansiedade e insônia.',
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // TODO: usar o id pra buscar o paciente real
  }

  setTab(tab: Tab) {
    this.activeTab = tab;
  }

  goBack() {
    this.router.navigateByUrl('/patients');
  }
}
